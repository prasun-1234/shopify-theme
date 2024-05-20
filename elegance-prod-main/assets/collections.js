var isCollectionProductLoaded = true;
var isScrolledToElement = false;
function isElementInViewport (el) {
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var userAgent = {
  isMobile: function(){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        return true;
    }
    else
    {
      return false;
    }
  }
}

var collection = {
  init: function(){
    collectionFilterNew.init();
    collection.loadMoreProduct();
    $(document).find('.always-show-add-to-cart').addClass('show-add-to-cart');
  },
  loadMoreProduct: function(){
    if($('.banner-down-arrow').length > 0)
    {
      document.querySelector(".banner-down-arrow").addEventListener('click', function() {
        if($(window).scrollTop() >= 50)
        {
          isScrolledToElement = true;
          setTimeout(function(){
            $('html, body').animate({
              scrollTop: $(".collection-wrapper").offset().top
            }, 1500);
          }, 200);
        }
        if($(window).scrollTop() < 50)
        {
          isScrolledToElement = false;
        }
      });
      // $(document).scroll(function(){
      //   if($(window).scrollTop() >= 50 && !isScrolledToElement)
      //   {
      //     isScrolledToElement = true;
      //     setTimeout(function(){
      //       var scrollTop     = $(window).scrollTop(),
      //         elementOffset = $('.collection-wrapper .container:eq(0)').offset().top,
      //         distance      = (elementOffset - scrollTop);
      //       if(distance > 0)
      //       {
      //         $('html, body').animate({
      //           scrollTop: ($(window).scrollTop() + distance)
      //         }, 1500);
      //       }
      //     }, 200);
      //   }
      //   if($(window).scrollTop() < 50)
      //   {
      //     isScrolledToElement = false;
      //   }
      // });
    }
    if($(document).find('.load-more-product').length > 0)
    {
      var eTop = $('.collection-all-view').offset().top;
      $(window).on('scroll', function() { 
       if (($(window).scrollTop() >= $('.collection-all-view').offset().top + $('.collection-all-view').outerHeight() - window.innerHeight) && isCollectionProductLoaded)
        {
           isCollectionProductLoaded = false;
           let page_current = parseInt($('.load-more-product').attr('data-current'));
           let total_page = parseInt($('.load-more-product').attr('data-page'));
           let page = page_current + 1;
           let url = window.location.href;
           if(getParameterByName('page', url) == 'available')
           {
             url = updateQueryStringParameter(url, 'page', page);
           }
           else
           {
             url = `${url}?page=${page}`;
           }
           
           if($('.collection-wrapper .sort-by').val() != 'manual')
           {
             url = `${url}&sort_by=${$('.collection-wrapper .sort-by').val()}`;
           }
           if(occurrences(url, "?") > 1)
           {
             url = replaceLast(url, '?', '&');
           }
           if(page_current < total_page)
           {
             $('.load-more-product-spinner').addClass('show-spinner');
             $('.collection-all-view .ajax-loader').show();
             $.ajax({
               type: 'GET',
               url: url,
               dataType: "html",
               success: function(resultData) {
                 $('.load-more-product-spinner').removeClass('show-spinner');
                 $('.collection-all-view .ajax-loader').hide();
                 //set products
                 $('.collection-wrapper .collection-products').append($(resultData).find('.collection-wrapper .collection-products').html());
                 //set showing product number
                 $('.collection-wrapper .showing-product-number').html($(resultData).find('.collection-wrapper .showing-product-number').html());
                 setTimeout(function(){
                   $(document).find('.always-show-add-to-cart').addClass('show-add-to-cart');
                 }, 500);
                 $('.load-more-product').attr('data-current', page);
                 isCollectionProductLoaded = true;
                 animationsScrollMagic();
                 setTimeout(function() {
                  }, 500);
               }
             });
           }
           else
           {
             isCollectionProductLoaded = true;
           }
        } 
      }); 
    }
  }
}

var collectionFilterNew = {
  init: function(){
    collectionFilterNew.classes();
    if(userAgent.isMobile())
    {
      collectionFilterNew.mobileFilter();
    }
    else
    {
      collectionFilterNew.newFilter();
    }
    collectionFilterNew.setFilter();
    //check for query string show_only exist in url
    if(getParameterByName('show_only', window.location.href) == 'available')
    {
      $(document).find('li[data-filter="product-show"]').addClass('selected');
    }
    $('.filter').show();
  },
  classes: function(){
    filter = "filter";
    filter_by = "filter-by";
  },
  newFilter: function(){
    $(document).on('click', `.desktop-filter .${filter_by}`, function(){
      let data_filter = $(this).attr('data-filter');
      switch(data_filter) {
        case 'collection':
          // code block
          //remove selected class from all collection product type and vendor
          $(`.${filter_by}[data-filter='collection'], [data-filter='type-list'], [data-filter='vendor-list']`).removeClass('selected');
          $(this).addClass('selected');
          var data_value = $(this).attr("data-value");
          collectionFilterNew.filterByCollection(data_value);
          break;
        case 'type-list':
          // code block
          //remove selected class from all collection product type and vendor
          $(`.${filter_by}[data-filter='collection'], [data-filter='type-list'], [data-filter='vendor-list']`).removeClass('selected');
          $(this).addClass('selected');
          var data_value = $(this).attr("data-value");
          collectionFilterNew.filterByProductType(data_value);
          break;
        case 'vendor-list':
          // code block
          //remove selected class from all collection product type and vendor
          $(`.${filter_by}[data-filter='collection'], [data-filter='type-list'], [data-filter='vendor-list']`).removeClass('selected');
          $(this).addClass('selected');
          var data_value = $(this).attr("data-value");
          collectionFilterNew.filterByProductVendor(data_value);
          break;
        case 'specific-tag':
          // code block
          collectionFilterNew.structureFilterData(this, data_filter);
          //check if any filter is selected
          if($(this).closest('.filter-block-list').find('.selected').length == 0)
          {
            $(this).closest('.filter-block-list').find(`.${filter_by}:eq(0)`).addClass('selected');
            //add color-selected class if color filter
            if($(this).hasClass('color-button'))
            {
              $(this).closest('.filter-block-list').find(`.${filter_by}:eq(0)`).addClass('color-selected');
            }
          }
          collectionFilterNew.filterByProductTag();
          break;
        case 'product-show':
          // code block
          if(!$(this).hasClass('selected'))
          {
            $(this).addClass('selected');
          }
          else
          {
            $(`.${filter_by}[data-filter="product-show"]`).removeClass('selected');
          }
          collectionFilterNew.filterByProductTag();
          break;
        default:
          // code block
      }
    });
  },
  mobileFilter: function(){
    let data_filter = '';
    let data_value = '';
    $(`body .mobile-filter .${filter_by}`).on('click', function(){
      data_filter = $(this).attr('data-filter');
      data_value = $(this).attr("data-value");
      if(data_filter == 'specific-tag')
      {
        collectionFilterNew.structureFilterData(this, data_filter);
      }
      else if(data_filter == 'product-show')
      {
        if(!$(this).hasClass('selected'))
        {
          $(this).addClass('selected');
        }
        else
        {
          $(`.${filter_by}[data-filter="product-show"]`).removeClass('selected');
        }
      }
      else
      {
        //remove previous selected class from collection option
        $('body .mobile-filter .filter-block-view [data-filter="collection"]').removeClass('selected');
        //remove previous selected class from product type option
        $('body .mobile-filter .filter-block-view [data-filter="type-list"]').removeClass('selected');
        //remove previous selected class from vendor option
        $('body .mobile-filter .filter-block-view [data-filter="vendor-list"]').removeClass('selected');
        //remove all selected class from all tag filter
        $('body .mobile-filter .filter-block-view [data-filter="specific-tag"]').removeClass('selected');
        $(this).addClass('selected');
        //if data filter is collection
        if(data_filter == 'collection')
        {
          $('body .collection-wrapper').attr("data-collection", data_value);
        }
        //hide tag filter
        $('body .mobile-filter .filter-block-view [data-filter="specific-tag"]').closest('.filter-block-view').hide();
        //apply mobile filter
        $('body .apply-mobile-filter').trigger('click');
      }
    });
    //apply mobile filter
    $(document).on('click', 'body .apply-mobile-filter', function(){
      switch(data_filter) {
        case 'collection':
          // code block
          collectionFilterNew.filterByCollection(data_value);
          break;
        case 'type-list':
          // code block
          collectionFilterNew.filterByProductType(data_value);
          break;
        case 'vendor-list':
          // code block
          collectionFilterNew.filterByProductVendor(data_value);
          break;
        case 'specific-tag':
          // code block
          collectionFilterNew.filterByProductTag();
          break;
        case 'product-show':
          // code block
          collectionFilterNew.filterByProductTag();
          break;
        default:
          // code block
      }
    });
  },
  structureFilterData: function(element, data_filter){
    if($(element).attr('data-value') != 'all' && data_filter != 'product-show')
    {
      //remove checked and selected from filter option 'all'
      $(element).closest('.filter-block-list').find('input:eq(0)').prop("checked", false);
      $(element).closest('.filter-block-list').find(`.${filter_by}:eq(0)`).removeClass('selected');
      //remove selected class from unchecked filter
      if(!$(element).hasClass('selected'))
      {
        $(element).addClass('selected');
      }
      else
      {
        $(element).removeClass('selected');
      }
      //for color swatch
      if($(element).closest('.color-block').length > 0)
      {
        //remove 'color-selected' from filter option 'all'
        $(element).closest('.filter-block-list').find('button:eq(0)').removeClass('color-selected');
        if($(element).hasClass('color-selected'))
        {
          $(element).removeClass('selected');
          $(element).removeClass('color-selected');
        }
        else
        {
          $(element).addClass('selected');
          $(element).addClass('color-selected');
        }
      }
    }
    else
    {
      //remove checked from all filter element of the specific filter section
      $(element).closest('.filter-block-list').find('input').prop("checked", false);
      //add checked to filter option 'all'
      $(element).find('input').prop("checked", true);
      //remove selected attribute from all filter element of the specific filter section
      $(element).closest('.filter-block-list').find('.selected').removeClass('selected');
      //add selected attribute to filter option 'all'
      $(element).addClass('selected');
      //for color swatch
      if($(element).closest('.color-block').length > 0)
      {
        $(element).closest('.filter-block-list').find('.color-selected').removeClass('color-selected');
        $(element).addClass('color-selected');
      }
    }
  },
  filterByCollection: function(data_value){
    let shop_url = $(`body .${filter}`).attr("data-url");
    let filter_url = `${shop_url}/collections/${data_value}`;
    if(!userAgent.isMobile())
    {
      $('.collection-wrapper').attr("data-collection", data_value);
      //reset all tag
      collectionFilterNew.resetTagFilter();
      //show all tag
      $(`body .desktop-filter .${filter_by}[data-filter='specific-tag']`).closest('.filter-block-view').show();
    }
    collectionFilterNew.getFilteredData(filter_url);
  },
  filterByProductType: function(data_value){
    let shop_url = $(`body .${filter}`).attr("data-url");
    let filter_url = `${shop_url}/collections/types?q=${data_value}`;
    if(!userAgent.isMobile())
    {
      //reset all tag
      collectionFilterNew.resetTagFilter();
      //hide all tag
      $(`body .desktop-filter .${filter_by}[data-filter='specific-tag']`).closest('.filter-block-view').hide();
    }
    collectionFilterNew.getFilteredData(filter_url);
  },
  filterByProductVendor: function(data_value){
    let shop_url = $(`body .${filter}`).attr("data-url");
    let filter_url = `${shop_url}/collections/vendors?q=${data_value}`;
    if(!userAgent.isMobile())
    {
      //reset all tag
      collectionFilterNew.resetTagFilter();
      //hide all tag
      $(`body .desktop-filter .${filter_by}[data-filter='specific-tag']`).closest('.filter-block-view').hide();
    }
    collectionFilterNew.getFilteredData(filter_url);
  },
  filterByProductTag: function(){
    let shop_url = $(`body .${filter}`).attr("data-url");
    let collection_url = $('.collection-wrapper').attr("data-collection");
    if(collection_url == 'types' || collection_url == 'vendors')
    {
      collection_url = 'all';
    }
    // device detection
    var selected_tags = `body .desktop-filter .${filter_by}[data-filter="specific-tag"].selected`;
    if(userAgent.isMobile())
    {
      var selected_tags = `body .mobile-filter .${filter_by}[data-filter="specific-tag"].selected`;
    }
    let tags = '';
    $(selected_tags).each(function(index, element){
      if($(element).attr('data-value') != 'all')
      {
        if(tags == '')
        {
          tags = tags + `/${$(element).attr('data-value')}`;
        }
        else
        {
          tags = tags + `+${$(element).attr('data-value')}`;
        }
      }
    });
    let filter_url = `${shop_url}/collections/${collection_url}${tags}`;
    collectionFilterNew.getFilteredData(filter_url);
  },
  resetTagFilter: function(){
    //remove selected class from all tag filter
    $(`body .desktop-filter .${filter_by}[data-filter='specific-tag']`).removeClass('selected');
    //remove checked attribute from all tag filter
    $(`body .desktop-filter .${filter_by}[data-filter='specific-tag'] input[type='checkbox']`).prop("checked", false);
    //add class selected to the first filter of every tag filter section
    $(`body .desktop-filter .${filter_by}[data-filter='specific-tag'][data-value='all']`).addClass('selected');
    //add checked attribute to the first filter input
    $(`body .desktop-filter .${filter_by}[data-filter='specific-tag'][data-value='all'] input[type='checkbox']`).prop("checked", true);
    //remove color-selected class from all color filter
    $(`body .desktop-filter .${filter_by}.color-button[data-filter='specific-tag']`).removeClass('color-selected');
    //add color-selected class to color filter
    $(`body .desktop-filter .${filter_by}.color-button[data-filter='specific-tag'][data-value='all']`).addClass('color-selected');
  },
  setFilter: function(){
    $(document).find('.filter-block-list').each(function(index, element){
      if($.trim($(element).html()) == '')
      {
        $(element).closest('.filter-block-view').hide();
      }
      else
      {
        if($(element).find('.selected').length == 0 && $(element).find('li[data-filter="product-show"]').length <= 0)
        {
          $(element).find(`.${filter_by}:eq(0)`).addClass('selected');
          $(element).find(`.${filter_by}:eq(0) input[type=checkbox]`).prop("checked", true);
          //for color swatch
          if($(element).hasClass('color-list'))
          {
            $(element).find(`.${filter_by}:eq(0)`).addClass('color-selected');
          }
        }
      }
    });
  },
  getFilteredData: function(url){
    //check for sort by exist in url
    if(getParameterByName('sort_by', window.location.href) != undefined)
    {
      url = url + '?sort_by=' + getParameterByName('sort_by', window.location.href);
    }
    //check for product availability filter
    let filter = 'desktop-filter';
    if(userAgent.isMobile())
    {
      filter = 'mobile-filter';
    }
    if($(`body .${filter} .filter-by[data-filter="product-show"]`).hasClass('selected'))
    {
      url = url + '?show_only=available';
    }
    if(occurrences(url, "?") > 1)
    {
      url = replaceLast(url, '?', '&');
    }
    collectionFilterNew.getData(url);
  },
  getData: function(url){
    if(!userAgent.isMobile())
    {
      if(!isElementInViewport($('.collection-all-view .collection-products-wrap')))
      {
        $("html, body").animate({ scrollTop: jQuery(".collection-wrapper").offset().top }, 500).promise().done(function () {
          $('.collection-all-view .collection-products .pure-g').css('opacity', 0);
          $('.collection-all-view .collection-products .no-product-found').hide();
          $('.collection-all-view .collection-products-wrap').css('height','70vh');
          $('.collection-all-view .filter-loader').addClass('show-spinner');
          $('.collection-all-view .filter-loader').show();
          
          if($('.collection-all-view .pagination-link').length > 0)
          {
            $('.collection-all-view .pagination-link').hide();
          }
          collectionFilterNew.loadAjaxData(url);
        });
      }
      else
      {
        $('.collection-all-view .collection-products .pure-g').css('opacity', 0);
        $('.collection-all-view .collection-products .no-product-found').hide();
        $('.collection-all-view .collection-products-wrap').css('height','70vh');
        $('.collection-all-view .filter-loader').addClass('show-spinner');
        $('.collection-all-view .filter-loader').show();
        
        if($('.collection-all-view .pagination-link').length > 0)
        {
          $('.collection-all-view .pagination-link').hide();
        }
        collectionFilterNew.loadAjaxData(url);
      }
    }
    else
    {
      window.location.href = url;
    }
  },
  loadAjaxData: function(url){
    $.ajax({
      type: 'GET',
      url: url,
      dataType: "html",
      success: function(resultData) {
        $('.d-filter').removeClass('show-d-filter');
        $('.collection-all-view .collection-products').html('');
        //set top bar
        $('.collection-all-view .collection-view-top-bar').html($(resultData).find('.collection-all-view .collection-view-top-bar').html());
        //set height
        $('.collection-all-view .collection-products-wrap').css('height','auto');
        //set product
        $('.collection-all-view .collection-products').html($(resultData).find('.collection-all-view .collection-products').html());
        let desktop_filter_html = $(resultData).find('.desktop-filter .filter-by-tag').html();
//         desktop_filter_html = desktop_filter_html.replace(/\wow fadeInUp/g, ' ');
        $('.desktop-filter .filter-by-tag').html(desktop_filter_html);
        //set pagination page
        $('.load-more-product').attr('data-page', $(resultData).find('.load-more-product').attr('data-page'));
        $('.load-more-product').attr('data-current', 1);
        $('.collection-all-view .filter-loader').removeClass('show-spinner');
        $('.collection-all-view .filter-loader').hide();
        collectionFilterNew.setFilter();
        animationsScrollMagic();
        //set header image link
        $('.collection-header-wrap').html('');
        $('.collection-header-wrap').html($(resultData).find('.collection-header-wrap').html());
        //set pagination link
        setTimeout(function(){
          $('.collection-all-view .pagination-wrap').html($(resultData).find('.collection-all-view .pagination-wrap').html());
        }, 300);
        //change url
        setTimeout(function(){
          let stateObj = {
            page: "filter-collection",
            url: url
          };
          history.pushState(stateObj, "", url);
          //check if show only available
          if(getParameterByName('show_only', window.location.href) == 'available')
          {
            $(document).find('li[data-filter="product-show"]').addClass('selected');
          }
          else
          {
            $(document).find('li[data-filter="product-show"]').removeClass('selected')
          }
        }, 300);
      }
    });
  }
}

var paginationAjax = {
  init: function(){
    $(document).on('click', '.paginate', function(){
      collectionFilterNew.getData($(this).attr('data-href'));
    });
  }
}

var collectionVar;
function checkIfJqueryLoaded()
{
  if(window.jQuery && typeof isFunctionJsFileLoaded != undefined)
  {
    clearInterval(collectionVar);
    setTimeout(function(){
      collection.init();
      paginationAjax.init();
    }, 500);
    // FILTER CODE //
    $(".selection-box").click(function() {
      $(".filter-block .screen-two").addClass("open-screen");
      $(".filter-block ").addClass("close-screen-one");
    });

    $(".back-filter").click(function() {
      $(".filter-block .screen-two").removeClass("open-screen");
      $(".filter-block ").removeClass("close-screen-one");
    });
    
    //filter modal
    $( ".mobile-filter-icon" ).click(function() {
      $(".filter-modal").addClass( "show-modal" );
    });

    $( ".filter-close-modal" ).click(function() {
      $(".filter-modal").removeClass( "show-modal" );
    });
  }
  else
  {
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  collectionVar = setInterval(checkIfJqueryLoaded, 200);
});