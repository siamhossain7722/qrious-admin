<?php
/**
 * Plugin Name: Siam Ahmed - Senior Developer Portfolio
 * Plugin URI: https://qrioustechbd.com
 * Description: Elite Next.js Reeni-inspired personal developer portfolio landing page with interactive dark/light theme, typewriter headline, animated counters, filterable project modals, and lead capture.
 * Version: 1.0.0
 * Author: Siam Ahmed & Qrious Tech
 * Author URI: https://qrioustechbd.com
 * License: GPL-2.0+
 * Text Domain: siam-portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

define('SIAM_PORTFOLIO_VERSION', '1.0.0');
define('SIAM_PORTFOLIO_PATH', plugin_dir_path(__FILE__));
define('SIAM_PORTFOLIO_URL', plugin_dir_url(__FILE__));

class Siam_Developer_Portfolio {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        register_activation_hook(__FILE__, array($this, 'activate_plugin'));
        add_action('init', array($this, 'init_rewrite_rules'));
        add_filter('template_include', array($this, 'override_page_template'), 999);
        add_filter('theme_page_templates', array($this, 'add_page_templates'));
        add_shortcode('siam_portfolio', array($this, 'render_shortcode'));

        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));

        // AJAX Contact handlers
        add_action('wp_ajax_siam_submit_contact', array($this, 'handle_contact_ajax'));
        add_action('wp_ajax_nopriv_siam_submit_contact', array($this, 'handle_contact_ajax'));
    }

    public function activate_plugin() {
        // Automatically create Portfolio page if not exists
        $page_id = get_option('siam_portfolio_page_id');
        $page = $page_id ? get_post($page_id) : null;

        if (!$page || $page->post_status === 'trash') {
            $new_page_id = wp_insert_post(array(
                'post_title'     => 'Portfolio - Siam Ahmed',
                'post_name'      => 'portfolio',
                'post_status'    => 'publish',
                'post_type'      => 'page',
                'post_content'   => '<!-- wp:paragraph --><p>[siam_portfolio]</p><!-- /wp:paragraph -->',
                'comment_status' => 'closed'
            ));

            if ($new_page_id && !is_wp_error($new_page_id)) {
                update_option('siam_portfolio_page_id', $new_page_id);
            }
        }

        flush_rewrite_rules();
    }

    public function init_rewrite_rules() {
        // Can also trigger via ?portfolio=1
        add_rewrite_endpoint('portfolio', EP_ROOT);
    }

    public function is_portfolio_request() {
        if (is_admin()) {
            return false;
        }

        $page_id = get_option('siam_portfolio_page_id');
        if ($page_id && (is_page($page_id) || (isset($_GET['page_id']) && $_GET['page_id'] == $page_id))) {
            return true;
        }

        if (is_page(8) || (isset($_GET['page_id']) && $_GET['page_id'] == 8)) {
            return true;
        }

        if (is_front_page() || is_home()) {
            return true;
        }

        if (is_page('portfolio') || is_page('siam-portfolio') || is_page('home') || is_page('admin-portfolio')) {
            return true;
        }

        if (isset($_GET['siam_portfolio']) && $_GET['siam_portfolio'] == '1') {
            return true;
        }

        if (isset($_GET['portfolio']) && $_GET['portfolio'] == '1') {
            return true;
        }

        global $post;
        if ($post && (has_shortcode($post->post_content, 'siam_portfolio') || strpos($post->post_content, 'siam-portfolio-wrapper') !== false)) {
            return true;
        }

        return false;
    }

    public function add_page_templates($templates) {
        $templates['siam-portfolio-template.php'] = 'Siam Developer Portfolio (Full Width & Responsive)';
        return $templates;
    }

    public function override_page_template($template) {
        if (get_page_template_slug() === 'siam-portfolio-template.php' || $this->is_portfolio_request()) {
            $custom_template = SIAM_PORTFOLIO_PATH . 'templates/portfolio-template.php';
            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    public function render_shortcode() {
        ob_start();
        include SIAM_PORTFOLIO_PATH . 'templates/portfolio-template.php';
        return ob_get_clean();
    }

    public function enqueue_frontend_assets() {
        if ($this->is_portfolio_request()) {
            // Google Fonts
            wp_enqueue_style(
                'siam-google-fonts',
                'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Rajdhani:wght@500;600;700&display=swap',
                array(),
                null
            );

            // FontAwesome 6
            wp_enqueue_style(
                'siam-fontawesome',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
                array(),
                '6.5.1'
            );

            // Custom Style
            wp_enqueue_style(
                'siam-portfolio-style',
                SIAM_PORTFOLIO_URL . 'assets/css/style.css',
                array(),
                SIAM_PORTFOLIO_VERSION
            );

            // Custom JS
            wp_enqueue_script(
                'siam-portfolio-script',
                SIAM_PORTFOLIO_URL . 'assets/js/main.js',
                array(),
                SIAM_PORTFOLIO_VERSION,
                true
            );

            wp_localize_script('siam-portfolio-script', 'siamPortfolioData', array(
                'ajaxUrl'  => admin_url('admin-ajax.php'),
                'nonce'    => wp_create_nonce('siam_portfolio_nonce'),
                'assetUrl' => SIAM_PORTFOLIO_URL . 'assets/'
            ));
        }
    }

    public function add_admin_menu() {
        add_menu_page(
            'Siam Portfolio',
            'Siam Portfolio',
            'manage_options',
            'siam-portfolio-settings',
            array($this, 'render_admin_settings_page'),
            'dashicons-art',
            30
        );

        add_submenu_page(
            'siam-portfolio-settings',
            'Received Inquiries',
            'Inquiries & Leads',
            'manage_options',
            'siam-portfolio-inquiries',
            array($this, 'render_admin_inquiries_page')
        );
    }

    public function register_settings() {
        register_setting('siam_portfolio_options_group', 'siam_portfolio_name');
        register_setting('siam_portfolio_options_group', 'siam_portfolio_role');
        register_setting('siam_portfolio_options_group', 'siam_portfolio_email');
        register_setting('siam_portfolio_options_group', 'siam_portfolio_phone');
        register_setting('siam_portfolio_options_group', 'siam_portfolio_avatar_url');
    }

    public function render_admin_settings_page() {
        $page_id = get_option('siam_portfolio_page_id');
        $page_url = $page_id ? get_permalink($page_id) : home_url('/portfolio');
        ?>
        <div class="wrap">
            <h1>Siam Ahmed - Senior Developer Portfolio</h1>
            <p>Welcome to your portfolio manager. Your landing page is live at: 
                <a href="<?php echo esc_url($page_url); ?>" target="_blank" class="button button-primary">View Live Portfolio &rarr;</a>
            </p>

            <form method="post" action="options.php" style="background:#fff; padding:25px; border-radius:8px; max-width:700px; box-shadow:0 2px 8px rgba(0,0,0,0.06); margin-top:20px;">
                <?php settings_fields('siam_portfolio_options_group'); ?>
                <?php do_settings_sections('siam_portfolio_options_group'); ?>

                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">Developer Full Name</th>
                        <td><input type="text" name="siam_portfolio_name" value="<?php echo esc_attr(get_option('siam_portfolio_name', 'Siam Ahmed')); ?>" class="regular-text" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Professional Role / Title</th>
                        <td><input type="text" name="siam_portfolio_role" value="<?php echo esc_attr(get_option('siam_portfolio_role', 'Senior Full-Stack Developer & Architect')); ?>" class="regular-text" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Contact Email</th>
                        <td><input type="email" name="siam_portfolio_email" value="<?php echo esc_attr(get_option('siam_portfolio_email', get_option('admin_email'))); ?>" class="regular-text" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Phone / WhatsApp</th>
                        <td><input type="text" name="siam_portfolio_phone" value="<?php echo esc_attr(get_option('siam_portfolio_phone', '+880 1700-000000')); ?>" class="regular-text" /></td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Profile Picture URL</th>
                        <td>
                            <input type="text" name="siam_portfolio_avatar_url" value="<?php echo esc_attr(get_option('siam_portfolio_avatar_url')); ?>" class="large-text" placeholder="Leave blank to use default built-in profile image" />
                            <p class="description">Paste any direct image URL from WordPress Media Library to swap your profile photo!</p>
                        </td>
                    </tr>
                </table>

                <?php submit_button('Save Portfolio Configuration'); ?>
            </form>
        </div>
        <?php
    }

    public function render_admin_inquiries_page() {
        $inquiries = get_option('siam_portfolio_inquiries', array());
        ?>
        <div class="wrap">
            <h1>Received Portfolio Inquiries</h1>
            <p>Direct inquiries submitted by prospective clients through your landing page contact form.</p>

            <table class="wp-list-table widefat fixed striped" style="margin-top:20px;">
                <thead>
                    <tr>
                        <th style="width:180px;">Date & Time</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Project Type</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($inquiries)) : ?>
                        <tr><td colspan="6">No inquiries received yet.</td></tr>
                    <?php else : ?>
                        <?php foreach (array_reverse($inquiries) as $item) : ?>
                            <tr>
                                <td><?php echo esc_html($item['date']); ?></td>
                                <td><strong><?php echo esc_html($item['name']); ?></strong></td>
                                <td><a href="mailto:<?php echo esc_attr($item['email']); ?>"><?php echo esc_html($item['email']); ?></a></td>
                                <td><?php echo esc_html($item['phone']); ?></td>
                                <td><span class="badge"><?php echo esc_html($item['subject']); ?></span></td>
                                <td><?php echo nl2br(esc_html($item['message'])); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }

    public function handle_contact_ajax() {
        check_ajax_referer('siam_portfolio_nonce', 'nonce');

        $name    = sanitize_text_field($_POST['name'] ?? '');
        $email   = sanitize_email($_POST['email'] ?? '');
        $phone   = sanitize_text_field($_POST['phone'] ?? '');
        $subject = sanitize_text_field($_POST['subject'] ?? 'General Inquiry');
        $message = sanitize_textarea_field($_POST['message'] ?? '');

        if (empty($name) || empty($email) || empty($message)) {
            wp_send_json_error(array('message' => 'Please fill all required fields.'));
        }

        $new_inquiry = array(
            'date'    => current_time('mysql'),
            'name'    => $name,
            'email'   => $email,
            'phone'   => $phone,
            'subject' => $subject,
            'message' => $message
        );

        $inquiries = get_option('siam_portfolio_inquiries', array());
        $inquiries[] = $new_inquiry;
        update_option('siam_portfolio_inquiries', $inquiries);

        // Send email to admin
        $admin_email = get_option('siam_portfolio_email', get_option('admin_email'));
        $email_subject = "New Portfolio Lead from: " . $name . " [" . $subject . "]";
        $email_body = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message\n";
        wp_mail($admin_email, $email_subject, $email_body);

        wp_send_json_success(array('message' => 'Your message has been received! I will reply within 24 hours.'));
    }
}

Siam_Developer_Portfolio::get_instance();
