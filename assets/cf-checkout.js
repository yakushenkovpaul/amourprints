(function progressBarInit() {
  if(typeof window.jQuery == 'undefined'){
    setTimeout(progressBarInit, 100);
    return;
  }

  const $=window.jQuery;

  var active_step = 'information';
  var info_link = 'class="no-link"';
  var ship_link = 'class="no-link"';
  var pay_link = 'class="no-link"';
  
  if($('ol.breadcrumb li.breadcrumb__item.breadcrumb__item--current span').length == 0){
    setTimeout(progressBarInit, 100);
    return;
  }

  var step = $('ol.breadcrumb li.breadcrumb__item.breadcrumb__item--current span').text();
  console.log('step: ', step);
  

  switch(step) {
    case "Information":
      // do not set info link or payment link, set shipping link also to nothing
      info_link = 'class="no-link active-step"';
      break;
    case "Shipping":
      // info and payment are both clickable
      //info_link = 'href="https://amourprints.com/' + window.location.pathname + '?step=contact_information"';
      ship_link = 'class="no-link active-step"';
      //pay_link = 'href="https://amourprints.com/' + window.location.pathname + '?step=payment_method"';
      break;
    case "Payment":
      active_step = 'shipping'; // setting this to the previous step so that later the code can move the bar and it looks fancy and cool
      // info and shipping are both clickable
      //info_link = 'href="https://amourprints.com/' + window.location.pathname + '?step=contact_information"';
      //ship_link = 'href="https://amourprints.com/' + window.location.pathname + '?step=shipping_method"';
      pay_link = 'class="no-link active-step"';
      break;
    default:
      break;
  }

  let chevron = "<img src='https://cdn-3.convertexperiments.com/uf/10035189/10033096/1626998078armourprints_chevron.png' />";
  $('ol.breadcrumb').after(`<div class="steps-progress-section desktop">
<div class="step-labels">
<a href="https://amourprints.com/cart">Cart</a>
<a ${info_link}>Information</a>
<a ${ship_link}>Shipping</a>
<a ${pay_link}>Payment</a>
</div>

<div class="progress-bar" active-step="${active_step}">
<div class="fill"></div>
<div class="step step-cart"></div>
<div class="chevron-break">${chevron}</div>
<div class="step step-information"></div>
<div class="chevron-break">${chevron}</div>
<div class="step step-shipping"></div>
<div class="chevron-break">${chevron}</div>
<div class="step step-payment"></div>
</div>
</div>`);

  $('header.banner').after(`<div class="steps-progress-section mobile">
<div class="step-labels">
<a href="https://amourprints.com/cart">Cart</a>
<a ${info_link}>Information</a>
<a ${ship_link}>Shipping</a>
<a ${pay_link}>Payment</a>
</div>

<div class="progress-bar" active-step="${active_step}">
<div class="fill"></div>
<div class="step step-cart"></div>
<div class="chevron-break">${chevron}</div>
<div class="step step-information"></div>
<div class="chevron-break">${chevron}</div>
<div class="step step-shipping"></div>
<div class="chevron-break">${chevron}</div>
<div class="step step-payment"></div>
</div>
</div>`);

  $('button[type="submit"]:contains("Pay now")').on('click', function() {
    $('.progress-bar').attr('active-step', 'complete');
  });

  // move the progress bar after a small delay
  setTimeout(function() {
    $('.progress-bar').attr('active-step', step.toLowerCase());
  }, 500);

})();