<?php include( TEMPLATEPATH . '/buzz/ComicParser.php' ); ?>

<?php get_header(); ?>

<?php get_template_part('template-part', 'head'); ?>

<?php get_template_part('template-part', 'topnav'); ?>

<?php
  $args = array(
    'post_type'   => "comics",
    'meta_key'    => 'ComicStatus',
    "meta_value"  => "true",
    "meta_compare"     => "LIKE"
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
        <div class="row text-center random-four">
        <?php $cnt=0; foreach ( $featuredComics as $featured ): ?>
          <?php $cp = new ComicParser($featured); ?>
            <div class="col-lg-6 col-md-6 portfolio-item">
              <div class="random-four-img-wrapper">
                <a href="<?php echo get_permalink($cp->getId()); ?>">
                  <img class="img-responsive" src="<?php echo $cp->getThumbnail(); ?>">
                </a>
              </div>
              <h3><a href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></h3>
              <p><?php echo $cp->getExcerpt(); ?></p>
            </div>
        <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <!-- CLASSIC COMICS -->
      <?php if ( sizeof($classicComics) ) : ?>
        <div class="row">
          <div class="col-sm-12 dmbs-main">
            <h2 class="front-big-label">Random Classics</h2>
          </div>
        </div>
        <div class="row text-center random-four">
        <?php $cnt=0; foreach ( $classicComics as $classic ): ?>
          <?php $cp = new ComicParser($classic); ?>
            <div class="col-lg-6 col-md-6 portfolio-item">
              <div class="random-four-img-wrapper">
                <a href="<?php echo get_permalink($cp->getId()); ?>">
                  <img class="img-responsive" src="<?php echo $cp->getThumbnail(); ?>">
                </a>
              </div>
              <h3><a href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></h3>
              <p><?php echo $cp->getExcerpt(); ?></p>
            </div>
        <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <!-- NON-CLASSIC COMICS -->
      <?php if ( sizeof($nonClassicComics) ) : ?>
        <div class="row">
          <div class="col-sm-12 dmbs-main">
            <h2 class="front-big-label">Random WebComics</h2>
          </div>
        </div>
        <div class="row text-center random-four">
        <?php $cnt=0; foreach ( $nonClassicComics as $nonClassic ): ?>
          <?php $cp = new ComicParser($nonClassic); ?>
            <div class="col-lg-6 col-md-6 portfolio-item">
              <div class="random-four-img-wrapper">
                <a href="<?php echo get_permalink($cp->getId()); ?>">
                  <img class="img-responsive" src="<?php echo $cp->getThumbnail(); ?>">
                </a>
              </div>
              <h3><a href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></h3>
              <p><?php echo $cp->getExcerpt(); ?></p>
            </div>
        <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
</div>
<!-- end content container -->

<?php get_footer(); ?>
