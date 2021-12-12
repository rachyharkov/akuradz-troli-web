

document.addEventListener("DOMContentLoaded", function()
{	
	// Activate sidebar nav
	const elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);
	loadNav();

	$(".lazy").each(function() 
	{
    	var src = $(this).data("src");
    	if (src) 
    	{
        	var img = new Image();
        	img.style.display = "none";
        	img.onload = function() {
            	$(this).fadeIn(1000);
        	};
        	$(this).append(img);            
        	img.src = src;
    	}
	});

	function loadNav()
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if(this.readyState === 4)
			{
				if (this.status != 200)
				{
					return;
				}
				//muat daftar tautan
				document.querySelectorAll(".topnav, .sidenav").forEach(function(elm)
				{
					elm.innerHTML = xhttp.responseText;
				});

				//Daftarkan event listener untuk setiap tautan menu/terapkan event listenernya
				document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm)
				{
					elm.addEventListener("click", function(event)
					{
						//tutup sidenav
						var sidenav = document.querySelector(".sidenav");
						M.Sidenav.getInstance(sidenav).close();

						//Muat konten halaman yang dipanggil
						page = event.target.getAttribute("href").substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	var page = window.location.hash.substr(1);
	if(page == "")
	{
		page = "home";
	}
	loadPage(page);

	function initiateSlickforRightInWrapper()
	{
		$('.right-inwrapper').slick({
	  		autoplay: true,
	  		dots: false,
			infinite: true,
			speed: 300,
			fade: true,
			arrows: false,
			cssEase: 'linear'
		});
	}

	function initiateProdukUnggulanSlide()
	{
		$('.wrapper').slick({
	  		slidesToShow: 3,
	  		infinite: true,
	  		slidesToScroll: 1,
	  		autoplay: true,
	  		autoplaySpeed: 3000,
	  		arrows: true,
	  		pauseOnHover: false,
	  		dots: false,
	      	responsive: [
	      	{
	        	breakpoint: 768,
	        	settings:
	        	{
	          		slidesToShow: 2,
	          		arrows: true

	        	}
	      	},
	      	{
	        	breakpoint: 480,
	        	settings:
	        	{
	          		slidesToShow: 1,
	          		arrows: true
	        	}
	      	}]
		});
	}

	function initiateGambarTroliSlide()
	{
		$('.wrapper-troli').slick({
	  		slidesToShow: 1,
	  		infinite: true,
	  		slidesToScroll: 1,
	  		autoplay: true,
	  		autoplaySpeed: 3000,
	  		arrows: false,
	  		pauseOnHover: false,
	  		dots: true, 	
		});
	}

	function initiateGambarTestiSlide()
	{
		$('.testimonialimage-wrapper').slick({
	  		slidesToShow: 1,
	  		infinite: true,
	  		slidesToScroll: 1,
	  		autoplay: true,
	  		autoplaySpeed: 3000,
	  		arrows: false,
	  		pauseOnHover: false,
	  		dots: false, 	
		});
	}

	function destroySlick()
	{
		if ($('.right-inwrapper').hasClass('slick-initialized')) 
		{
    		$('.right-inwrapper').slick('destroy');
  		}

  		if ($('.wrapper').hasClass('slick-initialized')) 
		{
    		$('.wrapper').slick('destroy');
  		}

  		if ($('.testimonialimage-wrapper').hasClass('slick-initialized'))
  		{
  			$('.testimonialimage-wrapper').slick('destroy');
  		}

  		if ($('.wrapper-troli').hasClass('slick-initialized')) 
		{
    		$('.wrapper-troli').slick('destroy');
  		} 
	}

	function initiateBgSlid()
	{
		//langsung diinisialisasikan bila memang window diresive <768 dalam sekali sesi, untuk seterusnya, bakal diterapin terus walaupun udah gak < 768
		var windowSize = $(this).width(); // Could've done $(this).width()
	    if(windowSize < 768)
	    {
	    	setInterval(function() 
	    	{
			   	var $landingsection = $('#landing-section');
		   		if($landingsection.hasClass('background1'))
			   	{
			       	$landingsection.removeClass('background1');
			      	$landingsection.addClass('background2');
			   	}
			   	else if($landingsection.hasClass('background2'))
			   	{
			   		$landingsection.removeClass('background2');
			   		$landingsection.addClass('background3')
			   	}
			  	else if($landingsection.hasClass('background3'))
			  	{        
		       		$landingsection.removeClass('background3');
		       		$landingsection.addClass('background4');
		    	}
		    	else if($landingsection.hasClass('background4'))
			  	{        
		       		$landingsection.removeClass('background4');
		       		$landingsection.addClass('background1');
		    	}
			}, 7000); //still needs to be fixed
    	}
	}

	function initiateIconCool() //suspecting bug
	{
		//untuk bisa menginisialisasikan sesuatu, kudu deteksi resize window oleh user, lalu deteksi if secara realtime berdasarkan interaksi user dengan aktivitas resizenya

		var windowSize = $(this).width();
		if(windowSize > 990)
		{
			$('#btntokopedia').hover(function()
		    {
				$('.logo-toped').toggleClass('animate-desktop');
				console.log("OWO"); 
		    });

		    $('#btnolx').hover(function()
		    {
				$('.logo-olx').toggleClass('animate-desktop');
				console.log("OWO"); 
		    });

		    $('#btnshopee').hover(function()
		    {
				$('.logo-shopee').toggleClass('animate-desktop');
				console.log("OWO"); 
		    });
		}
		else
		{
			setInterval(function()
			{
				if($('.logo-shopee').hasClass('animate-mobile'))
				{
					$('.logo-shopee').removeClass('animate-mobile');
					$('.logo-toped').addClass('animate-mobile');
				}
				else if($('.logo-toped').hasClass('animate-mobile'))
				{
					$('.logo-toped').removeClass('animate-mobile');
					$('.logo-olx').addClass('animate-mobile');
				}
				else
				{
					$('.logo-olx').removeClass('animate-mobile');
					$('.logo-shopee').addClass('animate-mobile');
				}
			}, 6000);
		}
	}

	function loadPage(page)
	{
		var xhttp = new XMLHttpRequest();

		//tambahkan loading biar keren
		xhttp.onloadstart = function () 
        {
            var content = document.querySelector("#body-content");
            content.innerHTML = `  
            <div style="padding-top: 200px; text-align: center;">
	            <div class="preloader-wrapper active">
					<div class="spinner-layer spinner-red-only">
						<div class="circle-clipper left">
							<div class="circle"></div>
						</div>
						<div class="gap-patch">
							<div class="circle"></div>
						</div><div class="circle-clipper right">
							<div class="circle"></div>
						</div>
					</div>
	            </div>
			</div>`;

			document.querySelector("#footer-link").style.display = "none";
        }

		xhttp.onreadystatechange = function()
		{
			var content = document.querySelector("#body-content");
			if(this.readyState == 4){
				if(this.status == 200)
				{
					content.innerHTML = xhttp.responseText;
					initiateBgSlid();
					destroySlick();
					initiateSlickforRightInWrapper();
					initiateProdukUnggulanSlide();
					initiateIconCool();
					initiateGambarTestiSlide();
					document.querySelector("#footer-link").style.display = "block";
					initiateGambarTroliSlide();
					//activate modal
					var mdl = document.querySelectorAll(".modal");
				  	M.Modal.init(mdl);
				}
				else if(this.status == 200)
				{
				content.innerHTML = "<div class='container' style='height: 768px; text-align: center;'><h2>Halaman yang anda cari tidak ditemukan :(</h2><div>";
				}
			}
			else
			{
				content.innerHTML = 
					"<div class='container' style='height: 768px; text-align: center;'><h5>Halaman tidak dapat dimuat, apa anda terhubung ke internet?</h5><br><a class='waves-effect waves-light btn' onclick='location.reload();'><i class='material-icons left'>refresh</i>Muat Ulang</a><div>";		
			}
		};
		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}

});