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

  $randArgs = array(
    'post_type'  => "comics",
    "orderby" => "rand",
    "posts_per_page" => "4"
  );
?>

<!-- start content container -->
<div class="row dmbs-content">

    <?php //left sidebar ?>
    <?php get_sidebar( 'left' ); ?>

    <div class="col-md-<?php devdmbootstrap3_main_content_width(); ?> dmbs-main">
      <p></p>
      <div id="buzzCarousel" class="carousel slide" data-ride="carousel">

        <?php $the_query = new WP_Query( $args ); if ( $the_query->have_posts() ) : ?>
                <div class="carousel-inner" style="height:500px;">
              <?php $cnt=0; while ( $the_query->have_posts() ): ?>
              <?php if($cnt == 0 || $cnt % 3 == 0) : ?>
                  <div class="item <?php echo $cnt == 0 ? "active" : "" ?>">
              <?php endif; ?>
              <?php $the_query->the_post(); $cp = new ComicParser($post); ?>
                <div class="featured-wrapper">
                  <a class="featured-link" href="<?php echo get_permalink($cp->getId()); ?>"><img class="img-responsive" src="<?php echo $cp->getCover(); ?>" alt="<?php echo $cp->getTitle(); ?>"></a>
                  <div class="featured-info-wrapper">
                    <h1><a class="featured-link" href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></h1>
                  </div>
                </div>
              <?php $cnt++; ?>

              <?php if ($cnt ==0 || $cnt % 3 == 0 || $cnt == $the_query->found_posts) : ?>
                  </div>
              <?php endif; ?>

            <?php endwhile; ?>
                </div>
    
            <a class="left carousel-control" onclick="return false;" href="#buzzCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
            <a class="right carousel-control" onclick="return false;" href="#buzzCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
   
        <?php endif; wp_reset_postdata(); ?>
      </div>
      <p></p>
      <div class="row text_center">
        <div class="col-md-6">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- bizzbuzz-read-top -->
        <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1319358860215477"
        data-ad-slot="6070069179"
        data-ad-format="auto"></ins>
        <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        </div>
        <div class="col-md-6">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <!-- bizzbuzz-read-top -->
        <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1319358860215477"
        data-ad-slot="6070069179"
        data-ad-format="auto"></ins>
        <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        </div>

      </div>
      <p><br /></p>
      <p></p>
      <?php $the_query3 = new WP_Query( $randArgs ); if ( $the_query3->have_posts() ) : ?>
        <div class="row text-center random-four">
        <?php $cnt=0; while ( $the_query3->have_posts() ): ?>
          <?php $the_query3->the_post(); $cp = new ComicParser($post); ?>
            <div class="col-lg-6 col-md-6 portfolio-item">
              <div class="random-four-img-wrapper">
                <a href="<?php echo get_permalink($cp->getId()); ?>">
                  <img class="img-responsive" src="<?php echo $cp->getThumbnail(); ?>">
                </a>
              </div>
              <h3><a href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></h3>
              <p><?php echo $cp->getExcerpt(); ?></p>
            </div>
        <?php endwhile; ?>
        </div>
      <?php endif; wp_reset_postdata(); ?>
    </div>
</div>
<!-- end content container -->

<?php get_footer(); ?>
