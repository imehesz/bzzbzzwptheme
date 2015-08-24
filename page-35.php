<?php include( TEMPLATEPATH . '/buzz/ComicParser.php' ); ?>

<?php get_header(); ?>

<?php get_template_part('template-part', 'head'); ?>

<?php get_template_part('template-part', 'topnav'); ?>

<?php
  $args = array(
    'post_type'   => "comics",
    'meta_key'    => 'ComicStatus',
    "meta_value"  => "true",
    "meta_compare"     => "LIKE",
    "posts_per_page" => "8"
  );
  $featuredComics = get_posts($args);

  $randArgs = array(
    'post_type'  => "comics",
    "orderby" => "rand",
    "posts_per_page" => "4"
  );

  // a random set of classic comics
  $classicArgs = array_merge($randArgs, array(
    "tax_query" => array(
      array(
        "taxonomy"  => "comics-tag",
        "field"     => "slug",
        "terms"     => "classic",
        "operator"  => "in"
      )
    )
  ));
  $classicComics = get_posts($classicArgs);

  // a random set of non-classic comics
  $nonClassicArgs = array_merge($randArgs, array(
    "tax_query" => array(
      array(
        "taxonomy"  => "comics-tag",
        "field"     => "slug",
        "terms"     => "classic",
        "operator"  => "not in"
      )
    )
  ));
  $nonClassicComics = get_posts($nonClassicArgs);
?>

<!-- start content container -->
<div class="row dmbs-content">

    <?php //left sidebar ?>
    <?php get_sidebar( 'left' ); ?>

    <div class="col-md-<?php devdmbootstrap3_main_content_width(); ?> dmbs-main">
      <!-- FEATURED COMICS -->
      <?php if ( sizeof($featuredComics) ) : ?>
        <div class="row">
          <div class="col-sm-12 dmbs-main">
            <h1 class="front-big-label">Featured This Week</h1>
          </div>
        </div>

        <?php $type="featured"; include(locate_template("template-part-comics-short-list.php")); ?>
      <?php endif; ?>


      <!-- CLASSIC COMICS -->
      <?php if ( sizeof($classicComics) ) : ?>
        <div class="row">
          <div class="col-sm-12 dmbs-main">
            <h2 class="front-big-label">Random Classics</h2>
          </div>
        </div>

        <?php $type="classic"; include(locate_template("template-part-comics-short-list.php")); ?>
      <?php endif; ?>

      <!-- NON-CLASSIC COMICS -->
      <?php if ( sizeof($nonClassicComics) ) : ?>
        <div class="row">
          <div class="col-sm-12 dmbs-main">
            <h2 class="front-big-label">Random WebComics</h2>
          </div>
        </div>

        <?php $type="nonClassic"; include(locate_template("template-part-comics-short-list.php")); ?>
      <?php endif; ?>
    </div>
</div>
<!-- end content container -->

<?php get_footer(); ?>
