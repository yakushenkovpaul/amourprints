(function() {
    window.FacebookPixel = undefined;
    var loadScript = function(url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
            script.onreadystatechange = function() {
                callback();
            };
        } else {
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };


//Store info for capi  
// console.log('<b>Event Check Analysis for Browser Tracking Only:</b><br><b>Shopify Store URL =</b> amourprints.myshopify.com<br>Main Pixel 0: 155711458402835 (Pixel Conversions API)<br><b>App Version =</b> API <br><b>API Access Token =</b> LUOwzTP7<br><b>Test Event Code =</b> <br><b>Tracking System =</b> ON<br><b>Include Tax & Shipping =</b> Yes<br><b>Pixel Delay =</b> 0 Secs<br><b>Purchase Percentage =</b> 100%<br><b>PageView =</b> Good<br><b>ViewCategory =</b> Good<br><b>ViewContent =</b> Good<br><b>AddToCart =</b> Good<br><b>InitiateCheckout =</b> Good<br><b>Purchase =</b> (Customer can test purchase event on their end by following my testing video below)<br>');
  
    
    var trackSystem = '1';
        //console.log(trackSystem,'trackSystem');
        //console.log(document.getElementsByTagName('head')[0].innerHTML);
    if (typeof fbq === 'undefined' || typeof fbq === 'function') {
        var myAppJavaScript = function($) {
            ! function(f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function() {
                    n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = '2.0';
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window,
            document, 'script', '//connect.facebook.net/en_US/fbevents.js');
            window.FacebookPixel = fbq;
            $(document).ready(function() {
                var str = JSON.stringify({"Main Pixel0":"155711458402835"});
                var newArr = JSON.parse(str);
                var collect_str = JSON.stringify([]);
                var collectNewArr = JSON.parse(collect_str);
                var pageViewFbCall = function() {

                    setTimeout(function(){ 
                        //by me
                        if (location.pathname.match(/^\/products/) || location.pathname.match(/^\/collections/) || location.pathname.match(/^\/cart/) || location.pathname.match(/thank_you/g)) {

                        }else{
                           
                                var evtid = new Date().getTime();
                                if(trackSystem){
                                    //console.log('pageview 1')
                                    FacebookPixel('track', 'PageView',{},{'eventID':evtid}); 
                                }
                                
                                //console.log('pageview cart 1',evtid,location.pathname);
                                
                                //for all pages
                                hitCapI(null,null,evtid);
                                
                            
                        }
                    }, 0);
                }
                //console.log('onload',localStorage.getItem('ptypes'));
                var pptypes = JSON.parse(localStorage.getItem('ptypes')); 
                var getPixelIds = function (productIds, type, content) {
                    $.ajax({
                        url:'https://pixelconversionpro.com/pixel-api/collectionByProductId.php',
                        dataType:'JSON',
                        crossDomain: true,
                        data:{'productIds':productIds,storeName:'amourprints.myshopify.com'},
                        type:'POST',
                        success:function(data) {
                            let collections = data.collectionIds;
                            //console.log('collections',collections)
                            let inc = 0;
                            let pxls = [];
                            Object.values(collections).forEach(function (value) {
                                if(productIds[inc] == value.productId && value.collectionId) {
                                    Object.keys(value.collectionId).forEach(function (key) {
                                        FacebookPixel('init', value.collectionId[key]);
                                        pxls.push(value.collectionId[key])
                                    });
                                }
                                inc++;
                            });
                            //by me
                            
                                var evtid = new Date().getTime();
                                pxls = pxls.filter(function (x, i, a) { 
                                            return a.indexOf(x) == i; 
                                        });
                                        
                                //console.log(evtid,'evtid',location.pathname.match(/^\/thank_you/));
                                //console.log('ptypesptypes',localStorage.getItem('ptypes'),pxls);
                                if(type!='Purchase' && type!='PageView') { 
                                    if(trackSystem){
                                  //  console.log('pageview 2')
                                        FacebookPixel('track', 'PageView',{},{'eventID':evtid});
                                    }
                                    
                                    //hitCapI(null,null,evtid);
                                    pxls.forEach(function (value) {
                                        //content.data['pixel'] = value;
                                       // console.log(value,'value');
                                        hitCapI({pixel:value},null,evtid);
                                        
                                    });
                                    if(pxls.length == 0){
                                        //console.log('pageview cart 2',evtid);
                                        hitCapI(null,null,evtid);
                                    }
                                }
                                
                                if(content) {
                                    var evtid = new Date().getTime();
                                    if(trackSystem){
                                        FacebookPixel('track', type, content,{'eventID':evtid});
                                    }
                                    pxls.forEach(function (value) {
                                        content['pixel'] = value;
                                        //console.log('custom 3',value);
                                        hitCapI(content,'custom',evtid);
                                        
                                    });
                                    
                                    
                                    if(pxls.length == 0){
                                        //console.log('pageview cart 3',evtid);
                                        hitCapI(content,null,evtid);
                                    }else{
                                        delete content['pixel'];
                                        hitCapI(content,null,evtid);
                                        
                                    }
                                }
                                
                                if(type=='PageView'){
                                
                                    var evtid = new Date().getTime();
                                    if(trackSystem){
                                        FacebookPixel('track', type, {},{'eventID':evtid});
                                    }
                                    pxls.forEach(function (value) {
                                        
                                        hitCapI({pixel:value,evt_type:'PageView'},null,evtid);
                                        
                                    });
                                    
                                    
                                    if(pxls.length == 0){
                                        //console.log('pageview cart 3',evtid);
                                        hitCapI(content,null,evtid);
                                    }else{
                                        delete content['pixel'];
                                        hitCapI(content,null,evtid);
                                        
                                    }
                               

                                    
                                }
                            
                        },
                        error:function(err) {
                            console.log(err)
                        }
                    });
                };
                var getPixelIdsCustom = function (productIds,pending_events) {
                    $.ajax({
                        url:'https://pixelconversionpro.com/pixel-api/collectionByProductIdCustom.php',
                        dataType:'JSON',
                        crossDomain: true,
                        data:{'productIds':productIds,storeName:'amourprints.myshopify.com'},
                        type:'POST',
                        success:function(data) {
                            let inc = 0;
                            let pxids = data.collectionIds;
                           // console.log('datadata',data,data.collectionIds.length)
                            
                                //console.log(pxids);
                                pxids = pxids.filter(function (x, i, a) { 
                                            return a.indexOf(x) == i; 
                                        });
                               // console.log(pxids,'pxids add to cart');
                                pxids.forEach(function (value) {
                                //console.log(value,'val');
                                    pending_events.data['pixel'] = value;
                                    console.log('custom 4',value);
                                    hitCapI(pending_events.data,'custom',pending_events.eventID)
                                    localStorage.clear();
                                });
                                
                                 
                                
                                if(pxids.length == 0){
                                    hitCapI(pending_events.data,null,pending_events.eventID)
                                }else{
                                delete pending_events.data['pixel'];
                                    hitCapI(pending_events.data,null,pending_events.eventID)
                                }
                                        
                              
                        },
                        error:function(err) {
                            console.log(err)
                        }
                    });
                };
              
                var hitCapI = function (content,type,eventID) {
                    
                    //console.log('in function',content,type,eventID)
                    $.ajax({
                        url:'https://pixelconversionpro.com/pixel-api/capi.php',
                        dataType:'JSON',
                        crossDomain: true,
                        data:{storeName:'amourprints.myshopify.com',current_url:window.location.href,newArr:newArr,content:content,type:type,eventID:eventID},
                        type:'POST',
                        success:function(data) {
                          //  console.log(data,'data');
                        },
                        error:function(err) {
                           // console.log(err,'err');
                        }
                    });
                };
                 //localStorage.clear();
                //hitCapI(null,null);
                getPurEventSetting();
                function getPurEventSetting(){
                    var response;
                    $.ajax({
                        url:'https://pixelconversionpro.com/pixel-api/collectionByProductId.php',
                        dataType:'JSON',
                        crossDomain: true,
                        async:false,
                        data:{'purchaseEvent':'yes',storeName:'amourprints.myshopify.com'},
                        type:'POST',
                        success:function(data) {
                            response = data;
                        },
                        error:function(err) {
                            console.log(err)
                        }
                    });
                    return response;
                }
                
                
               // console.log('newArr',newArr)
                Object.keys(newArr).forEach(function (key) {
                    if(key.includes('Main Pixel')) {
                        FacebookPixel('init', newArr[key]);
                    }
                }); 
                pageViewFbCall();
                 // localStorage.clear();
                 console.log('get capiiiiiiii');
                 console.log(JSON.stringify(localStorage.getItem('capi')));
                var pending_events = JSON.parse(localStorage.getItem('capi'));
                //console.log(pending_events)
                if(pending_events && pending_events.name){
                    pending_events.data['evt_type'] =  pending_events.name;
                   // alert(pending_events.name)
                    if(pending_events.name=='AddToCart'){
                    
                       // console.log(pending_events.data.content_ids);
                        
                        
                        
                        var cids =[pending_events.data.content_ids];
                        getPixelIdsCustom(cids,pending_events);
                        localStorage.clear();
                    }else if( pending_events.name == 'InitiateCheckout'){
                    

                        getPixelIdsCustom(pending_events.data.content_ids,pending_events);
                        localStorage.clear();
                    }else{
                        //console.log(pending_events)
                        //console.log('custom 1');
                        hitCapI(pending_events.data,'custom',pending_events.eventID)
                        localStorage.clear();
                    }
                }
     
                //----------Start Buy It Now Button - App Version API ----
                var nativeFetch = window.fetch;
                window.fetch = function(...args) {
                    args.forEach(function(item,index) {
                        if(typeof item === 'string') {
                            if(item.indexOf('checkouts.json') !== -1) {
                                //console.log('buy it now clicked');
                                if (location.pathname.match(/\/products\/.+/)) {
                                    var d = {
                                        content_type: 'product_group',
                                        content_ids: meta.product.id,
                                        value: (meta.product.variants[0].price/100),
                                        num_items: '1',
                                        content_name: meta.product.variants[0].name,
                                        currency: Shopify.currency.active,
                                        content_category: meta.product.type
                                    }; 
                                    //console.log('d',d);
                                    //by me
                                    //console.log('setptypes',meta.product.type)
                                     localStorage.setItem('ptypes', JSON.stringify({name:meta.product.type}));
                                  
                                        var evtid = new Date().getTime();
                                        if(trackSystem){
                                            //console.log('ini 3');
                                            FacebookPixel('track', 'InitiateCheckout', d,{'eventID':evtid});
                                        }
                                        let cidArr= [];
                                        cidArr.push(meta.product.id);
                                        d.content_ids = cidArr;
                                        //console.log('buy',d)
                                        localStorage.setItem('capi', JSON.stringify({name:'InitiateCheckout',data:d,eventID:evtid}));
                                    
                                        
                               
                                }else if (location.pathname.match(/^\/cart/)) {
                                    CallCheckoutPixelOnCart();
                                }else{
                                    CallCheckoutPixelOnCartDrawer();
                                }
                            }
                        }
                    });
                    return nativeFetch.apply(window, args);
                }
                //----------End Buy It Now Button Update--------------------

                var addedToCart = false;
                var addToCart = function(addedVariantId) {
                    sessionStorage.removeItem('variant_name');
                    sessionStorage.removeItem('vriant_id');
                    var name;
                    var my_variants = location.search;
                    if(my_variants != '' || my_variants != undefined || my_variants != null) {
                        var my_id = my_variants.split('=');
                        my_id = my_id[1];
                        for(var i = 0; i < meta.product.variants.length; i++) {
                            if(meta.product.variants[i].id == my_id) {
                                name = meta.product.variants[i].name;
                                sessionStorage.setItem('variant_name',name);
                            } 
                        }
                    } 
                    if(sessionStorage.getItem('variant_name') != null) {
                        name = sessionStorage.getItem('variant_name');
                    } else {
                        name = meta.product.variants[0].name;
                    }
                    if (!addedToCart) {
                        var addedVariant = meta.product.variants.find(function(variant) {
                            return variant.id == addedVariantId;
                        });
                        if(addedVariant == undefined){
                            addedVariant = meta.product.variants[0];
                        }

                        //by me
                       
                            var evtid = new Date().getTime();
                            if(trackSystem){
                            //console.log(JSON.stringify(meta), __st.rid);
                           
                          //  alert();
                            
                                FacebookPixel('track', 'AddToCart', {
                                    content_ids: __st.rid,
                                    content_type: 'product_group',
                                    content_category: meta.product.type,
                                    content_name: name,
                                    currency: Shopify.currency.active, 
                                    value: (addedVariant.price /100),
                                },{eventID:evtid});
                            }
                            
                             
                            localStorage.setItem('capi',JSON.stringify( {name:'AddToCart',data:{
                                content_ids: __st.rid,
                                content_type: 'product_group',
                                content_category: meta.product.type,
                                content_name: name,
                                currency: Shopify.currency.active, 
                                value: (addedVariant.price /100),
                            },eventID:evtid}));
                            
                            var cids =[ __st.rid];
                            getPixelIdsCustom(cids,{name:'AddToCart',data:{
                                content_ids: __st.rid,
                                content_type: 'product_group',
                                content_category: meta.product.type,
                                content_name: name,
                                currency: Shopify.currency.active, 
                                value: (addedVariant.price /100),
                                evt_type:'AddToCart',
                            },eventID:evtid});
                            
                            console.log('add to craet');
                            console.log(localStorage.getItem('capi'));
                        //addedToCart = true;
                    }
                };
    
                if (location.pathname.match(/\/products\/.+/)) {
                    var ppixel = [];
                    $('.product_fb p').each(function() {
                        var fbPixel = $(this).attr('data-pixelid');
                        ppixel.push(fbPixel);
                        FacebookPixel('init', fbPixel);
                    });
                    //pageViewFbCall();
                    var url_variant_id = getUrlParameter('variant');
                    var content_id = __st.rid;
                    var content_name_value = meta.product.variants[0].name;
                    if(url_variant_id){
                        content_id = url_variant_id;
                        meta.product.variants.forEach(function(item,index) {
                            if(item.id == url_variant_id){
                                content_name_value = item.name;        
                            }
                        });
                    }
                    
                    var evtid = new Date().getTime();
                    if(trackSystem){
                        FacebookPixel('track', 'PageView',{},{'eventID':evtid}); 
                    }
                    
                    
                    setTimeout(function(){
                        //by me
                       
                            
                            if(trackSystem){
                                FacebookPixel('track', 'ViewContent', {
                                    content_ids: __st.rid,
                                    //content_ids: content_id,
                                    content_type: 'product_group',
                                    content_category: meta.product.type,
                                    //content_name: meta.product.variants[0].name,
                                    content_name: content_name_value,
                                    value: (meta.product.variants[0].price /100),
                                    currency: window.ShopifyAnalytics.meta.currency,
                                    app_ver: 'Pixel Conversions API vAPI',
                                },{eventID:evtid});
                            }
                            
                            //console.log('ppixel',ppixel)
                            for(var p=0; p<ppixel.length; p++){
                               hitCapI({
                                    content_ids: __st.rid,
                                    //content_ids: content_id,
                                    content_type: 'product_group',
                                    content_category: meta.product.type,
                                    //content_name: meta.product.variants[0].name,
                                    content_name: content_name_value,
                                    value: (meta.product.variants[0].price /100),
                                    currency: window.ShopifyAnalytics.meta.currency,
                                    app_ver: 'Pixel Conversions API vAPI',                            
                                    evt_type:'ViewContent',
                                    pixel:ppixel[p]
                                },null,evtid);
                                
                                //console.log(ppixel[p],'pixellllll');
                                hitCapI({pixel:ppixel[p],evt_type:'PageView'},null,evtid);
                            }
                            //for main pages
                            hitCapI({
                                    content_ids: __st.rid,
                                    //content_ids: content_id,
                                    content_type: 'product_group',
                                    content_category: meta.product.type,
                                    //content_name: meta.product.variants[0].name,
                                    content_name: content_name_value,
                                    value: (meta.product.variants[0].price /100),
                                    currency: window.ShopifyAnalytics.meta.currency,
                                    app_ver: 'Pixel Conversions API vAPI',                            
                                    evt_type:'ViewContent',
                                },null,evtid);
                          
                        hitCapI({evt_type:'PageView'},null,evtid);
                        
                    }, 0);
                     
                    
                      
                    if($('#purchase').length > 0) {
                        $('#purchase').click(function() {
                            // initiate checkout custom content drawer and model
                            var new_price = meta.product.variants[0].price /100;
                            products_total_price_drmodel = products_total_price_drmodel+new_price;
                            products_item_count_drmodel = products_item_count_drmodel+1;
                            if(!content_ids_arr_drmodel.includes(__st.rid)) {
                                content_ids_arr_drmodel.push(__st.rid);
                            }
                            if(!content_name_arr_drmodel.includes(meta.product.variants[0].name)) {
                                content_name_arr_drmodel.push(meta.product.variants[0].name);
                            }
                            if(!product_content_category.includes(meta.product.type)) {
                                //console.log('one');
                                product_content_category.push(meta.product.type);
                            }
                            // initiate checkout custom content drawer and model
                            var addedVariantId = $(this).children('[name="id"]').val();
                            console.log('from drawer');
                            addToCart(addedVariantId)
                        });
                    } else {
                        $('form[action="/cart/add"]').submit(function() {
                            // initiate checkout custom content drawer and model
                            var new_price = meta.product.variants[0].price /100;
                            products_total_price_drmodel = products_total_price_drmodel+new_price;
                            products_item_count_drmodel = products_item_count_drmodel+1;
                            if(!content_ids_arr_drmodel.includes(__st.rid)) {
                                content_ids_arr_drmodel.push(__st.rid);
                            }
                            if(!content_name_arr_drmodel.includes(meta.product.variants[0].name)) {
                                content_name_arr_drmodel.push(meta.product.variants[0].name);
                            }
                            if(!product_content_category.includes(meta.product.type)) {
                                //console.log('one');
                                product_content_category.push(meta.product.type);
                            }
                            // initiate checkout custom content drawer and model
                            var addedVariantId = $(this).children('[name="id"]').val();
                            console.log('from drawerrrsss');
                            addToCart(addedVariantId)
                        });
                    }
                    function getUrlParameter(sParam) {
                        var sPageURL = window.location.search.substring(1),
                            sURLVariables = sPageURL.split('&'),
                            sParameterName,
                            i;
                    
                        for (i = 0; i < sURLVariables.length; i++) {
                            sParameterName = sURLVariables[i].split('=');
                    
                            if (sParameterName[0] === sParam) {
                                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                            }
                        }
                    };
                }
                if (location.pathname.match(/^\/collections/)) {
                    Object.keys(collectNewArr
                    ).forEach(function (key) {
                        if(key == meta.page.resourceId) {
                            //console.log('ccc',collectNewArr[key])
                            FacebookPixel('init', collectNewArr[key]);
                        }
                    });
                   // pageViewFbCall();
                    if(location.pathname.match(/^\/collections\/.+/) && window.location.pathname.split('/').indexOf('products') == -1){
                        var current_collection = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
                        
                        var evtid = new Date().getTime();
                        if(trackSystem){
                            FacebookPixel('track', 'PageView',{},{'eventID':evtid}); 
                        }
                        setTimeout(function(){
                        
                        //by me
                       
                            
                            if(trackSystem){
                               
                                FacebookPixel('trackCustom', 'ViewCategory', {
                                    content_name: current_collection, 
                                    app_ver: 'Pixel Conversions API vAPI',
                                },{eventID:evtid});
                                
                                
                            }
                            
                            hitCapI({
                                content_name: current_collection, 
                                app_ver: 'Pixel Conversions API vAPI',
                                evt_type:'ViewCategory'
                            },null,evtid);
                            
                            //for all pages
                            hitCapI(null,null,evtid);
                             
                        
                        
                        }, 0);
                    }
                }
                if (location.pathname.match(/^\/cart/)) {
                    localStorage.setItem('product_types', '[]');
                    // for buy now button on cart page
                    function CallCheckoutPixelOnCart(){
                        var content_ids_arr = [];
                        var content_name_arr = [];
                        var products_total_price = 0;
                        var products_item_count = 0;
                        var products_currency = 'USD';
                        var productsInCartTypes = JSON.parse(localStorage.getItem('product_types'));
                        $.getJSON('/cart.js', function(products) {
                            products_total_price = (products.total_price/100);
                            products_item_count = products.item_count;
                            products_currency = products.currency;
                            products.items.forEach(function(item,index) {
                                content_ids_arr.push(item.product_id);
                                //content_ids_arr.push(item.id);
                                content_name_arr.push(item.title);
                                $('.cart_fb p').each(function() {
                                    var fbPixel = $(this).text();
                                    FacebookPixel('init', fbPixel);
                                });
                                //by me
                              
                                    var evtid = new Date().getTime();
                                    if(trackSystem){
                                        //console.log('pageview 3')
                                        FacebookPixel('track', 'PageView',{},{'eventID':evtid});
                                    }
                                    //console.log('pageview cart 4',evtid);
                                    hitCapI(null,null,evtid);
                                
                                if(productsInCartTypes.indexOf(item.product_type) === -1) {
                                    productsInCartTypes.push(item.product_type);
                                }
                            });
                            
                            localStorage.setItem('product_types', JSON.stringify(productsInCartTypes));
                            if (productsInCartTypes.filter(function(v){return v!==''}).length > 0) {
                                var product_cont_catogry = productsInCartTypes.filter(function(v){return v!==''});                       
                            }else{
                                var product_cont_catogry = 'Not Set';
                            }
                            var d= {
                                content_type: 'product_group',
                                content_ids: content_ids_arr,
                                value: products_total_price,
                                num_items: products_item_count,
                                content_name: content_name_arr.join(),
                                currency: products_currency,
                                content_category: product_cont_catogry,
                                evt_type:'InitiateCheckout'
                            };
                            //by me
                            //console.log('setptypes',product_cont_catogry)
                            localStorage.setItem('ptypes', JSON.stringify({name:product_cont_catogry}));
                            
                                var evtid = new Date().getTime();
                                if(trackSystem){
                                    //console.log('ini 4');
                                    FacebookPixel('track', 'InitiateCheckout', d,{eventID:evtid});
                                }
                                localStorage.setItem('capi', JSON.stringify({name:'InitiateCheckout',data:d,eventID:evtid}));
                            
                            
                        });                     
                        
                    }
                    var content_ids_arr = [];
                    var content_name_arr = [];
                    var products_total_price = 0;
                    var products_item_count = 0;
                    var products_currency = 'USD';
                    var productsInCartTypes = JSON.parse(localStorage.getItem('product_types'));
                    $.getJSON('/cart.js', function(products) {
                        products_total_price = (products.total_price/100);
                        products_item_count = products.item_count;
                        products_currency = products.currency;
                        let pxls = [];
                        products.items.forEach(function(item,index) {
                            content_ids_arr.push(item.product_id);
                            content_name_arr.push(item.title);
                            
                            $('.cart_fb p').each(function() {
                                var fbPixel = $(this).text();
                                FacebookPixel('init', fbPixel);
                                pxls.push(fbPixel);
                            });
                           
                            if(productsInCartTypes.indexOf(item.product_type) === -1) {
                                productsInCartTypes.push(item.product_type);
                            }
                        });
                            //by me
                            
                                var evtid = new Date().getTime();
                                if(trackSystem){
                                    //console.log('pageview 4')
                                    FacebookPixel('track', 'PageView',{},{'eventID':evtid});
                                }
                                pxls = pxls.filter(function (x, i, a) { 
                                            return a.indexOf(x) == i; 
                                        });
                                //console.log(pxls,'pxls 4');
                                pxls.forEach(function (value) {
                                    //console.log('custom 2',value);
                                    hitCapI({pixel:value},'custom',evtid);
                                });
                                hitCapI(null,null,evtid);
                                
                               /* if(pxls.length ==0){
                                console.log('pageview cart 5',evtid);
                                    hitCapI(null,null,evtid);
                                }*/
                            
                        localStorage.setItem('product_types', JSON.stringify(productsInCartTypes));
                    });
                    $('body').on('click', '[name="checkout"]', function (e) {
                        if (productsInCartTypes.filter(function(v){return v!==''}).length > 0) {
                            var product_cont_catogry = productsInCartTypes.filter(function(v){return v!==''});                         
                        }else{
                            var product_cont_catogry = 'Not Set';
                        }
                        var d =  {
                            content_type: 'product_group',
                            content_ids: content_ids_arr,
                            value: products_total_price,
                            num_items: products_item_count,
                            content_name: content_name_arr.join(),
                            currency: products_currency,
                            content_category: product_cont_catogry.join()
                        };
                        console.log('setptypes',product_cont_catogry.join())
                        localStorage.setItem('ptypes', JSON.stringify({name:product_cont_catogry.join()}));
                        //by me
                      
                            var evtid = new Date().getTime();
                            if(trackSystem){
                                //console.log('ini 5',content_ids_arr);
                                FacebookPixel('track', 'InitiateCheckout',d,{eventID:evtid});
                            }
                            localStorage.setItem('capi', JSON.stringify({name:'InitiateCheckout',data:d,eventID:evtid}));
                        
                    });
                } else {
                    // initiate checkout custom content drawer and model on buy now button
                    function CallCheckoutPixelOnCartDrawer(){
                        var content_ids_arr_drmodel = [];
                        var content_name_arr_drmodel = [];
                        var products_total_price_drmodel = 0;
                        var products_item_count_drmodel = 0;
                        var products_currency_drmodel = 'USD';
                        var product_content_category = [];
                        $.getJSON('/cart.js', function(products) {
                            products_total_price_drmodel = (products.total_price/100);
                            products_item_count_drmodel = products.item_count;
                            products_currency_drmodel = products.currency;
                            products.items.forEach(function(item,index) {
                                content_ids_arr_drmodel.push(item.product_id);
                                content_name_arr_drmodel.push(item.title);
                                if(!product_content_category.includes(item.product_type)) {
                                    product_content_category.push(item.product_type);
                                }
                                // product_content_category.push(item.product_type);
                            });
                            //localStorage.setItem('product_types', JSON.stringify(product_content_category));
                            if (product_content_category.filter(function(v){return v!==''}).length > 0) {
                                var product_cart_catogry = product_content_category.filter(function(v){return v!==''});                         
                            }else{
                                var product_cart_catogry = 'Not Set';
                            }
                            var d = {
                                content_type: 'product_group',
                                content_ids: content_ids_arr_drmodel,
                                value: parseFloat(products_total_price_drmodel).toFixed(2),
                                num_items: products_item_count_drmodel,
                                content_name: content_name_arr_drmodel.join(','),
                                currency: products_currency_drmodel,
                                content_category: product_cart_catogry
                            };
                               //console.log('setptypes',product_cart_catogry)
                               localStorage.setItem('ptypes', JSON.stringify({name:product_cart_catogry}));
                            //by me
                           
                                var evtid = new Date().getTime();
                                if(trackSystem){
                                    //console.log('ini 1');
                                    FacebookPixel('track', 'InitiateCheckout', d,{eventID:evtid});
                                }
                                localStorage.setItem('capi', JSON.stringify({name:'InitiateCheckout',data:d,eventID:evtid}));
                            
                        });
                    }
                    var content_ids_arr_drmodel = [];
                    var content_name_arr_drmodel = [];
                    var products_total_price_drmodel = 0;
                    var products_item_count_drmodel = 0;
                    var products_currency_drmodel = 'USD';
                    var product_content_category = [];
                    // initiate checkout custom content drawer and model
                    $('body').on('click', '[name="checkout"]', function (e) {
                        //console.log('checkout init 2');
                        var content_ids_arr_drmodel = [];
                        var content_name_arr_drmodel = [];
                        var products_total_price_drmodel = 0;
                        var products_item_count_drmodel = 0;
                        var products_currency_drmodel = 'USD';
                        var product_content_category = [];
                        $.getJSON('/cart.js', function(products) {
                            products_total_price_drmodel = (products.total_price/100);
                            products_item_count_drmodel = products.item_count;
                            products_currency_drmodel = products.currency;
                            products.items.forEach(function(item,index) {
                                content_ids_arr_drmodel.push(item.product_id);
                                content_name_arr_drmodel.push(item.title);
                                if(!product_content_category.includes(item.product_type)) {
                                    product_content_category.push(item.product_type);
                                }
                                //product_content_category.push(item.product_type);
                            });
                            localStorage.setItem('product_types', JSON.stringify(product_content_category));
                            if (product_content_category.filter(function(v){return v!==''}).length > 0) {
                                var product_cart_catogry = product_content_category.filter(function(v){return v!==''});                         
                            }else{
                                var product_cart_catogry = 'Not Set';
                            }
                            var d ={
                                content_type: 'product_group',
                                content_ids: content_ids_arr_drmodel,
                                value: parseFloat(products_total_price_drmodel).toFixed(2),
                                num_items: products_item_count_drmodel,
                                content_name: content_name_arr_drmodel,
                                currency: products_currency_drmodel,
                                content_category: product_cart_catogry
                            };
                            //by me
                                //console.log('setptypes',product_cart_catogry)
                             localStorage.setItem('ptypes', JSON.stringify({name:product_cart_catogry}));
                           
                                var evtid = new Date().getTime();
                                if(trackSystem){
                                    //console.log('ini 2');
                                    FacebookPixel('track', 'InitiateCheckout', d,{eventID:evtid});
                                }
                                localStorage.setItem('capi', JSON.stringify({name:'InitiateCheckout',data:d,eventID:evtid}));
                            
                        });
                    });
                }
                
                //console.log(Shopify.Checkout,'Shopify.Checkout',localStorage.getItem('ptypes'));
                //console.log('pptypes',pptypes);
        
                if (Shopify.Checkout && Shopify.Checkout.page == 'thank_you') {

                    var productIds = [];
                    var productNames = [];
                    var totalItems = 0;
                    var productTypes = JSON.parse(localStorage.getItem('product_types'));
                    Shopify.checkout.line_items.forEach(function(item, index) {
                        if(item.variant_title != ''){
                            var prod_name = item.title+' - '+item.variant_title;                            
                        }else{
                            var prod_name = item.title;
                        }
                        productNames.push(prod_name);
                        
                        productIds.push(item.product_id);
                        totalItems += parseInt(item.quantity);
                        //console.log('itemitem',item)
                    });
                    var getOrderID = localStorage.getItem('order_id');
                    var orderID = Shopify.checkout.line_items[0].product_id;
                    var checkout = Shopify.checkout;
                    
                    var checkPriceVal = getPurEventSetting();
                    var set_price_value = '';
                    if(checkPriceVal.show_price && checkPriceVal.show_price == 'no'){
                        set_price_value = checkout.subtotal_price;
                    }else{
                        set_price_value = checkout.total_price;
                    }
                    
                    if(checkPriceVal.pur_percent != ''){
                        set_price_value = (set_price_value * checkPriceVal.pur_percent/100).toFixed(2);
                        //set_price_value = (set_price_value - percent).toFixed(2);
                    }
                    
                    var purproductTypes = '';
                    if (productTypes && productTypes.filter(function(v){return v!==''}).length > 0) {
                        purproductTypes = productTypes.filter(function(v){return v!==''});                         
                    }else{
                        purproductTypes = 'Not Set';
                      
                        purproductTypes = pptypes && pptypes.name?pptypes.name:'Not Set';
                    }
                    
                    var d= {
                        content_ids: productIds,
                        content_name: productNames.join(),
                        content_type: 'product_group',
                        content_category: purproductTypes, 
                        value: set_price_value,
                        currency: checkout.currency,
                        num_items: totalItems,
                        evt_type: 'Purchase'
                    };
                    //console.log('purchase',productTypes,pptypes);
                    //alert('purchase');
                    getPixelIds(productIds,'Purchase',d);
                    getPixelIds(productIds,'PageView','');

                  
                    localStorage.setItem('order_id', orderID);
                    localStorage.setItem('product_types', '[]');
                } //end of if shopify.checkout
            });
        };

        if (typeof jQuery === 'undefined') {
            loadScript('//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', function() {
                jQuery220 = jQuery.noConflict(true);
                myAppJavaScript(jQuery220);
            });
        } else {
            myAppJavaScript(jQuery);    
        }
    }
})()