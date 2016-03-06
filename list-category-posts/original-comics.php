<?php

$lcp_display_output .= '<div class="row"><div class="col-md-12">';
foreach ($this->catlist->get_categories_posts() as $single){

  $lcp_display_output .= "<h3>" . $single->post_title . "</h3>";
  $lcp_display_output .= "<p>Published on the " . (date("jS \of F Y", strtotime($single->post_date))) . "</p>";
  $lcp_display_output .= "<p>" . $single->post_content . "</p>";
}

$lcp_display_output .= "</div></div>";

// If there's a "more link", show it:
$lcp_display_output .= $this->catlist->get_morelink();

//Pagination
$lcp_display_output .= $this->get_pagination();

$this->lcp_output = $lcp_display_output;
