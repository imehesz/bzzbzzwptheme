<?php switch($type){
  case "classic":
    $comics = $classicComics;
    break;
  case "nonClassic":
    $comics = $nonClassicComics;
    break;
  case "featured":
  default:
    $comics = $featuredComics;
} ?>

<div class="row text-center random-four">
  <?php $cnt=0; foreach ( $comics as $c ): ?>
    <?php $cp = new ComicParser($c); ?>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 portfolio-item">
        <div class="random-four-img-wrapper">
          <a href="<?php echo get_permalink($cp->getId()); ?>">
            <img class="img-responsive" src="<?php echo $cp->getThumbnail(); ?>">
          </a>
        </div>
        <h3 class="hidden-xs"><a href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></h3>
        <strong class="visible-xs"><a href="<?php echo get_permalink($cp->getId()); ?>"><?php echo $cp->getTitle(); ?></a></strong>
        <p class="visible-lg visible-md"><?php echo $cp->getExcerpt(); ?></p>
      </div>
  <?php endforeach; ?>
</div>

