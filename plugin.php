<?php
/*
Plugin Name: Roofing Calculator by Calculator.iO
Plugin URI: https://www.calculator.io/roofing-calculator/
Description: Use a free roofing square footage calculator to determine your roof size and get the right amount of roofing shingles for your job. Estimate cost, time, and labor for DIY or contractors.
Version: 1.0.0
Author: Calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_roofing_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Roofing Calculator by Calculator.iO";

function display_ci_roofing_calculator(){
    $page = 'index.html';
    return '<h2><a href="https://www.calculator.io/roofing-calculator/" target="_blank"><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48"></a> Roofing Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_roofing_calculator_iframe"></iframe></div>';
}

add_shortcode( 'ci_roofing_calculator', 'display_ci_roofing_calculator' );