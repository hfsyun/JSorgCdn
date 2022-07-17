var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (a) {
  return typeof a
} : function (a) {
  return a && typeof Symbol === 'function' && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
}

function cloneObject (a) {
  if (a == null || (typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object') return a
  if (a instanceof Date) {
    var e = new Date(a.getDate())
    return e
  }
  if (a instanceof Array) {
    for (var e = [], c = 0, f = a.length; c < f; c++) e[c] = a[c]
    return e
  }
  if (a instanceof Object) {
    e = {}
    for (c in a) a.hasOwnProperty(c) && (e[c] = cloneObject(a[c]))
    return e
  }
}
mashiro_global.variables = new function () {
  this.isNight = false
  this.skinSecter = false
}()
mashiro_global.ini = new function () {
  this.normalize = function () {
    lazyload()
    copy_code_block()
    social_share()
    mashiro_global.post_list_show_animation.ini()
    if ($('div').hasClass('poem-wrap')) {
      get_poem('.poem', '.info')
    }
    get_yiyan()
    $(function () { 
      if (navigator.userAgent.indexOf('AppleWebKit') != -1) {
        $('body').addClass('isWebKit')
      }
      hearthstone_deck_iframe()
    })
  }
  this.pjax = function () {
    pjaxInit()
    copy_code_block()
    social_share()
    mashiro_global.post_list_show_animation.ini()
    if ($('div').hasClass('poem-wrap')) {
      get_poem('.poem', '.info')
    }
    get_yiyan()
    hearthstone_deck_iframe()
  }
}()
mashiro_global.lib = new function () {
  this.removeClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  }
  this.addClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) { el.classList.add(className) } else {
      el.className += ' ' + className
    }
  }
  this.hasClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) { var e = el.classList.contains(className) } else {
      var e = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
    }
    return e
  }
  this.toggleClass = function (ele, className) {
    var el = document.getElementById(ele)
    if (el.classList) {
      el.classList.toggle(className)
    } else {
      var classes = el.className.split(' ')
      var existingIndex = classes.indexOf(className)
      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1)
      } else { classes.push(className) }
      el.className = classes.join(' ')
    }
  }
  this.saveFile = function (url, file_name) {
    var xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = function () {
      var a = document.createElement('a')
      a.href = window.URL.createObjectURL(xhr.response)
      a.download = file_name
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
    }
    xhr.open('GET', url)
    xhr.send()
  }
}()

function setCookie (name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + mashiro_option.cookie_version_control + '=' + (value || '') + expires + '; path=/'
}

function getCookie (name) {
  var nameEQ = name + mashiro_option.cookie_version_control + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function removeCookie (name) {
  document.cookie = name + mashiro_option.cookie_version_control + '=; Max-Age=-99999999;'
}

function jumpTo (url) {
  return mashiro_global.lib.pjax_to_url(url, '#app')
}

function injectStyles (rule) {
  var div = $('<div />', {
    html: '&shy;<style>' + rule + '</style>'
  }).appendTo('body')
}


mashiro_global.post_list_show_animation = new function () {
  this.ini = function (ajax) {
    $('article.post-list-thumb').each(function (i) {
      if (ajax) {
        var window_height = $(window).height()
      } else {
        if ($('.headertop').hasClass('headertop-bar')) {
          var window_height = 0
        } else {
          var window_height = $(window).height() - 300
        }
      }
      if (!mashiro_global.landing_at_home) {
        window_height += 300
      }
      var article_height = $('article.post-list-thumb').eq(i).offset().top
      if ($(window).height() + $(window).scrollTop() >= article_height) {
        $('article.post-list-thumb').eq(i).addClass('post-list-show')
      }
      $(window).scroll(function () {
        var scrolltop = $(window).scrollTop()
        if (scrolltop + window_height >= article_height && scrolltop) {
          $('article.post-list-thumb').eq(i).addClass('post-list-show')
        }
      })
    })
  }
}()





function scrollBar () {
  if (document.body.clientWidth > 860) {
    $(window).scroll(function () {
      var s = $(window).scrollTop()
      var a = $(document).height()
      var b = $(window).height()
      var result = parseInt(s / (a - b) * 100)
      $('#bar').css('width', result + '%')
      if (false) {
        if (result >= 0 && result <= 19) {
          $('#bar').css('background', '#cccccc')
        }
        if (result >= 20 && result <= 39) { $('#bar').css('background', '#50bcb6') }
        if (result >= 40 && result <= 59) {
          $('#bar').css('background', '#85c440')
        }
        if (result >= 60 && result <= 79) {
          $('#bar').css('background', '#f2b63c')
        }
        if (result >= 80 && result <= 99) { $('#bar').css('background', '#FF0000') }
        if (result == 100) {
          $('#bar').css('background', '#5aaadb')
        }
      } else {
        $('#bar').css('background', 'orange')
      }
      $('.toc-container').css('height', $('.site-content').outerHeight())
      $('.skin-menu').removeClass('show')
    })
  }
}
scrollBar()

function checkBgImgCookie () {
  var bgurl = getCookie('bgImgSetting')
  if (!bgurl) {
    $('#banner_wave_1').removeClass('banner_wave_hide_fit_skin')
    $('#banner_wave_2').removeClass('banner_wave_hide_fit_skin')
  } else {
    $('#banner_wave_1').addClass('banner_wave_hide_fit_skin')
    $('#banner_wave_2').addClass('banner_wave_hide_fit_skin')
  }
  var sakura_bg = mashiro_option.changeBG.sakura_bg
  var gribs_bg = mashiro_option.changeBG.gribs_bg
  var pixiv_bg = mashiro_option.changeBG.pixiv_bg
  var KAdots_bg = mashiro_option.changeBG.KAdots_bg
  var totem_bg = mashiro_option.changeBG.totem_bg
  var bing_bg = mashiro_option.changeBG.bing_bg 
  if (bgurl != '') {
    if (bgurl == sakura_bg  || bgurl == gribs_bg || bgurl == pixiv_bg || bgurl == KAdots_bg || bgurl == totem_bg) {
      mashiro_global.variables.skinSecter = true
      mashiro_global.variables.isNight = false
      $('#night-mode-cover').css('visibility', 'hidden')
      $('body').css('background-image', 'url(' + bgurl + ')')
      $('.site-header').css('background-color', 'rgba(255,255,255,1)')
      $('.pattern-center').removeClass('pattern-center').addClass('pattern-center-sakura')
      $('.headertop-bar').removeClass('headertop-bar').addClass('headertop-bar-sakura')
      $('#colophon.site-footer').css('background', 'none')
    } else if (bgurl == bing_bg) {
      mashiro_global.variables.skinSecter = true
      mashiro_global.variables.isNight = true
      $('#night-mode-cover').css('visibility', 'hidden')
      $('body').css('background-image', 'url(' + bgurl + ')')
      $('.site-header').css('background-color', 'rgba(255,255,255,1)')
      $('.pattern-center').removeClass('pattern-center').addClass('pattern-center-sakura')
      $('.headertop-bar').removeClass('headertop-bar').addClass('headertop-bar-sakura')
      $('#colophon.site-footer').css('background', 'none')
    } else {}
  } else {
    return false
  }
}
if (document.body.clientWidth > 860) {
  checkBgImgCookie()
}

function no_right_click () {
  $('.post-thumb img').bind('contextmenu', function (e) {
    return false
  })
}
if (mashiro_global.variables.isNight) {
  $('.changeSkin-gear, .toc').css('background', 'rgba(255,255,255,0.8)')
} else {
  $('.changeSkin-gear, .toc').css('background', 'none')
}
$(document).ready(function () {
  function changeBG (tagid, url) {
    $('.skin-menu ' + tagid).click(function () {
      mashiro_global.variables.skinSecter = true
      mashiro_global.variables.isNight = false
      $('#night-mode-cover').css('visibility', 'hidden')
      $('body').css('background-image', 'url(' + url + ')')
      $('.site-header').css('background-color', 'rgba(255,255,255,1)')
      $('.pattern-center').removeClass('pattern-center').addClass('pattern-center-sakura')
      $('.headertop-bar').removeClass('headertop-bar').addClass('headertop-bar-sakura')
      $('#colophon.site-footer').css('background', 'none')
      $('#banner_wave_1').addClass('banner_wave_hide_fit_skin')
      $('#banner_wave_2').addClass('banner_wave_hide_fit_skin')
      closeSkinMenu()
      setCookie('bgImgSetting', url, 30)
    })
  }

  function changeBGnoTrans (tagid, url) {
    $('.skin-menu ' + tagid).click(function () {
      mashiro_global.variables.skinSecter = true
      mashiro_global.variables.isNight = true
      $('#night-mode-cover').css('visibility', 'hidden')
      $('body').css('background-image', 'url(' + url + ')')
      $('.site-header').css('background-color', 'rgba(255,255,255,1)')
      $('.pattern-center').removeClass('pattern-center').addClass('pattern-center-sakura')
      $('.headertop-bar').removeClass('headertop-bar').addClass('headertop-bar-sakura')
      $('#colophon.site-footer').css('background', 'none')
      $('#banner_wave_1').addClass('banner_wave_hide_fit_skin')
      $('#banner_wave_2').addClass('banner_wave_hide_fit_skin')
      closeSkinMenu()
      setCookie('bgImgSetting', url, 30)
    })
  }
  var sakura_bg = mashiro_option.changeBG.sakura_bg
  var gribs_bg = mashiro_option.changeBG.gribs_bg
  var pixiv_bg = mashiro_option.changeBG.pixiv_bg
  var KAdots_bg = mashiro_option.changeBG.KAdots_bg
  var totem_bg = mashiro_option.changeBG.totem_bg
  var bing_bg = mashiro_option.changeBG.bing_bg 
  changeBG('#sakura-bg', sakura_bg )
  changeBG('#gribs-bg', gribs_bg)
  changeBG('#pixiv-bg', pixiv_bg)
  changeBG('#KAdots-bg', KAdots_bg)
  changeBG('#totem-bg', totem_bg)
  changeBGnoTrans('#bing-bg', bing_bg)
  $('.skin-menu #white-bg').click(function () {
    mashiro_global.variables.skinSecter = false
    mashiro_global.variables.isNight = false
    $('#night-mode-cover').css('visibility', 'hidden')
    $('body').css('background-image', 'none')
    $('.site-header').css('background-color', 'rgba(255,255,255,.0)')
    $('.pattern-center-sakura').removeClass('pattern-center-sakura').addClass('pattern-center')
    $('.headertop-bar-sakura').removeClass('headertop-bar-sakura').addClass('headertop-bar')
    $('.banner_waves').css('display', 'block')
    $('#banner_wave_1').removeClass('banner_wave_hide_fit_skin')
    $('#banner_wave_2').removeClass('banner_wave_hide_fit_skin')
    closeSkinMenu()
    setCookie('bgImgSetting', '', 30)
  })
  $('.skin-menu #dark-bg').click(function () {
    mashiro_global.variables.skinSecter = true
    mashiro_global.variables.isNight = true
    var dark_bg = mashiro_option.changeBG.dark_bg 
    $('body').css('background-image', 'url(' + dark_bg + ')')
    $('.site-header').css('background-color', 'rgba(255,255,255,.8)')
    $('#night-mode-cover').css('visibility', 'visible')
    $('.pattern-center').removeClass('pattern-center').addClass('pattern-center-sakura')
    $('.headertop-bar').removeClass('headertop-bar').addClass('headertop-bar-sakura')
    $('#colophon.site-footer').css('background', 'none')
    $('#banner_wave_1').addClass('banner_wave_hide_fit_skin')
    $('#banner_wave_2').addClass('banner_wave_hide_fit_skin')
    closeSkinMenu()
  })

  function closeSkinMenu () {
    $('.skin-menu').removeClass('show')
    setTimeout(function () {
      $('.changeSkin-gear').css('visibility', 'visible')
    }, 300)
    if (mashiro_global.variables.isNight) {
      $('.changeSkin-gear, .toc').css('background', 'rgba(255,255,255,0.8)')
    } else {
      $('.changeSkin-gear, .toc').css('background', 'none')
    }
  }
  $('.changeSkin-gear').click(function () {
    $('.skin-menu').toggleClass('show')
    if (mashiro_global.variables.isNight) {
      $('.changeSkin').css('background', 'rgba(255,255,255,0.8)')
    } else {
      $('.changeSkin').css('background', 'none')
    }
  })
  $('.skin-menu #close-skinMenu').click(function () {
    closeSkinMenu()
  })
})



var pjaxInit = function () {
  pjaxdone()
  timelink()
  lazyload()
  add_copyright()
  if (mashiro_global.variables.skinSecter === true) {
    $('.pattern-center').removeClass('pattern-center').addClass('pattern-center-sakura')
    $('.headertop-bar').removeClass('headertop-bar').addClass('headertop-bar-sakura')
    $('.banner_waves').css('display', 'none')
    $('#colophon.site-footer::before').css('display', 'none')
    if (mashiro_global.variables.isNight) {
      $('.black').css('background-color', 'rgba(255,255,255,1)')
      $('.toc').css('background-color', 'rgba(255,255,255,0.8)')
    }
  }
  $('.iconflat').css('width', '50px').css('height', '50px')
  $('.openNav').css('height', '50px')
  timeSeriesReload() 
}


$(document).ready(function() {
  pjaxdone()
  timelink()
  submenu()
});

function pjaxdone() {
  var bgindex = Math.floor(Math.random() * bg.length);
  $('.centerbg').css('background-image', 'url("' + bg[bgindex] + '")');
}

function submenu() {
$(".submenu").click(function() {
  $(this).toggleClass("submenu-open-icon")
  $(this).children(".sub-menu").toggle(300)
}); 
}

function timelink() {
  $(".main .year .list").each(function (e, target) {
    var $target=  $(target),
    $ul = $target.find("ul");
    $target.height($ul.outerHeight()), $ul.css("position", "absolute");
    }); 
    $(".main .year>h2>a").click(function (e) {
    e.preventDefault();
    $(this).parents(".year").toggleClass("close");
    });
}

if (document.body.clientWidth <= 860 && !window.is_app) {
  window.onscroll = function () {
    scrollFunction()
  }

  function scrollFunction () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('moblieGoTop').style.display = 'block'
    } else {
      document.getElementById('moblieGoTop').style.display = 'none'
    }
  }

  function topFunction () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}

function copy_code_block() {
  $('pre').addClass('line-numbers highlight-wrap')
  $('pre').on('click', function (e) {
    if (e.target !== this) return
    $(this).toggleClass('code-block-fullscreen')
    $('html').toggleClass('code-block-fullscreen-html-scroll')
  })
  $('pre code').each(function (i, block) {
    $(block).attr({ id: 'language-' + i })
    $(this).after('<a class="copy-code" href="javascript:" data-clipboard-target="#language-' + i + '" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a>')
  })
  var clipboard = new ClipboardJS('.copy-code')
}




function reload_show_date_time () {
  BirthDay = new Date('06/02/2017 18:00:00')
  today = new Date()
  timeold = (today.getTime() - BirthDay.getTime())
  sectimeold = timeold / 1000
  secondsold = Math.floor(sectimeold)
  msPerDay = 24 * 60 * 60 * 1000
  e_daysold = timeold / msPerDay
  daysold = Math.floor(e_daysold)
  monitorday.innerHTML = daysold
}


function timeSeriesReload (flag) {
  if (flag == true) {
    $('#archives-temp h3.ar-mon').click(function () {
      $(this).next().slideToggle(400)
      return false
    })
    lazyload()
  } else {
    (function () {
      $('#archives-temp h3.ar-mon').css({
        cursor: 's-resize'
      })
      $('#archives-temp h3.ar-mon').each(function () {
        var num = $(this).next().children('.brick').length
        $(this).children('#post-num').text(num)
      })
    })()
  }
}
timeSeriesReload()


function add_copyright () {
  document.body.addEventListener('copy', function (e) {
    if (!mashiro_global.is_user_logged_in && window.getSelection().toString().length > 30) {
      setClipboardText(e)
    }
  })

  function setClipboardText (event) {
    event.preventDefault()
    var htmlData = '' + window.getSelection().toString().replace(/\r\n/g, '\n')
    var textData = '' + window.getSelection().toString().replace(/\r\n/g, '\n')
    if (event.clipboardData) {
      event.clipboardData.setData('text/html', htmlData)
      event.clipboardData.setData('text/plain', textData)
      addComment.createButterbar('复制成功！<br>Copied to clipboard successfully!', 1000)
    } else if (window.clipboardData) {
      return window.clipboardData.setData('text', textData)
    }
  }
}
add_copyright()



function get_yiyan() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'https://v1.hitokoto.cn');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      var hitokoto = document.getElementById('hitokoto');
      hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
      hitokoto.innerText = data.hitokoto;
    }
  }
  xhr.send();
}



function get_poem (poem_ele, info_ele) {
  var poem = document.querySelector(poem_ele)
  var info = document.querySelector(info_ele)
  var xhr = new XMLHttpRequest()
  xhr.open('get', 'https://v2.jinrishici.com/one.json')
  xhr.withCredentials = true
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText)
      poem.innerHTML = data.data.content
      info.innerHTML = '【' + data.data.origin.dynasty + '】' + data.data.origin.author + '《' + data.data.origin.title + '》'
    }
  }
  xhr.send()
}


function hearthstone_deck_iframe () {
  if ($('iframe').hasClass('hearthstone-deck')) {
    $('.hearthstone-deck').each(function () {
      $(this).attr('height', $(this).width() * 5 / 9 + 'px')
    })
    $('.hearthstone-deck-container').each(function () {
      var deck_container_height_fix = $(this).width() * 5 / 9 + 14
      $(this).css('height', deck_container_height_fix + 'px')
    })
  }
}


mashiro_global.ini.normalize()

var home = location.href,
  s = $('#bgvideo')[0],
  Siren = {
    TOC: function () {
      if ($('.toc').length > 0 && document.body.clientWidth > 1200) {
        if ($(".pattern-center").length > 0) { 
          tocbot.init({
              tocSelector: '.toc',            
              contentSelector: '.entry-content', 
              scrollSmooth: true,
              headingSelector: 'h1, h2, h3, h4, h5', 
              headingsOffset: -400,
              scrollSmoothOffset: -85
          });
        } else {
          tocbot.init({            
              tocSelector: '.toc',             
              contentSelector: '.entry-content', 
              scrollSmooth: true,
              headingSelector: 'h1, h2, h3, h4, h5', 
              headingsOffset: -85,
              scrollSmoothOffset: -85
          });
        }
        var offsetTop = $('.toc').offset().top - 135
        window.onscroll = function () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop >= offsetTop) {
            $('.toc').addClass('toc-fixed')
          } else {
            $('.toc').removeClass('toc-fixed')
          }
        }
      }
    },
    VA: function () {
      if (!mashiro_option.valine) {
        var valine = new Valine();
        valine.init({
          el: '#vcomments',
          appId: mashiro_option.v_appId,
          appKey: mashiro_option.v_appKey,
          path: window.location.pathname,
          placeholder: '你是我一生只会遇见一次的惊喜 ...'
        })
      }
    },
    MJ: function () {
      if (mashiro_option.mathjax == '1') {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML', function () {
          MathJax.Hub.Config({tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]}})
          var math = document.getElementsByClassName('entry-content')[0]
          MathJax.Hub.Queue(['Typeset', MathJax.Hub, math])
        })
      }
    },
    MN: function () {
      $('.iconflat').on('click', function () {
        if ($('#main-container').hasClass('open')) {
          $('.iconflat').css('width', '50px').css('height', '50px')
          $('.openNav').css('height', '50px')
        } else {
          $('.iconflat').css('width', '100%').css('height', '100%')
          $('.openNav').css('height', '100%')
        }
        $('body').toggleClass('navOpen')
        $('#main-container,#mo-nav,.openNav').toggleClass('open')
      })
    }, MNH: function () {
      if ($('body').hasClass('navOpen')) {
        $('body').toggleClass('navOpen')
        $('#main-container,#mo-nav,.openNav').toggleClass('open')
      }
    }, splay: function () {
      $('#video-btn').addClass('video-pause').removeClass('video-play').show()
      $('.video-stu').css({
        'bottom': '-100px'
      })
      $('.focusinfo').css({
        'top': '-999px'
      })
      $('#meteor').css({
        'display': 'none'
      })
      $('#banner_waves').addClass('banner_wave_hide')    
      s.play()
    }, spause: function () {
      $('#video-btn').addClass('video-play').removeClass('video-pause')
      $('.focusinfo').css({
        'top': '49.3%'
      })
      $('#meteor').css({
        'display': 'none'
      })
      $('#banner_waves').addClass('banner_wave_hide')
      s.pause()
    }, liveplay: function () {
      if (s.oncanplay != undefined && $('.haslive').length > 0) {
        if ($('.videolive').length > 0) {
          Siren.splay()
        }
      }
    }, livepause: function () {
      if (s.oncanplay != undefined && $('.haslive').length > 0) {
        Siren.spause()
        $('.video-stu').css({
          'bottom': '0px'
        }).html('已暂停 ...')
      }
    }, addsource: function () {
      $('.video-stu').html('正在载入视频 ...').css({
        'bottom': '0px'
      })
      var t = Poi.movies.name.split(','),
        _t = t[Math.floor(Math.random() * t.length)]
      $('#bgvideo').attr('src', Poi.movies.url + '/' + _t)
      $('#bgvideo').attr('video-name', _t)
    }, LV: function () {
      var _btn = $('#video-btn')
      _btn.on('click', function () {
        if ($(this).hasClass('loadvideo')) {
          $(this).addClass('video-pause').removeClass('loadvideo').hide()
          Siren.addsource()
          s.oncanplay = function () {
            Siren.splay()
            $('#video-add').show()
            _btn.addClass('videolive')
            _btn.addClass('haslive')
          }
        } else {
          if ($(this).hasClass('video-pause')) {
            Siren.spause()
            _btn.removeClass('videolive')
            $('.video-stu').css({
              'bottom': '0px'
            }).html('已暂停 ...')
          } else {
            Siren.splay()
            _btn.addClass('videolive')
          }
        }
        s.onended = function () {
          $('#bgvideo').attr('src', '')
          $('#video-add').hide()
          _btn.addClass('loadvideo').removeClass('video-pause')
          _btn.removeClass('videolive')
          _btn.removeClass('haslive')
          $('.focusinfo').css({
            'top': '49.3%'
          })
        }
      })
      $('#video-add').on('click', function () {
        Siren.addsource()
      })
    }, CE: function () {
      $('.comments-hidden').show()
      $('.comments-main').hide()
      $('.comments-hidden').click(function () {
        $('.comments-main').slideDown(500)
        $('.comments-hidden').hide()
      })
      $('.archives').hide()
      $('.archives:first').show()
      $('#archives-temp h3').click(function () {
        $(this).next().slideToggle('fast')
        return false
      })
      $('.js-toggle-search').on('click', function () {
        $('.js-toggle-search').toggleClass('is-active')
        $('.js-search').toggleClass('is-visible')
      })
      $('.search_close').on('click', function () {
        if ($('.js-search').hasClass('is-visible')) {
          $('.js-toggle-search').toggleClass('is-active')
          $('.js-search').toggleClass('is-visible')
        }
      })
        $('#show-nav').on('click', function () {
          if($('#show-nav').hasClass('showNav')){
              $('#show-nav').removeClass('showNav').addClass('hideNav');
              $('.site-top .lower nav').addClass('navbar')
          }else{
              $('#show-nav').removeClass('hideNav').addClass('showNav');
              $('.site-top .lower nav').removeClass('navbar')
          }
      })
      $('#loading').click(function () {
        $('#loading').fadeOut(500)
      })
    }, NH: function () {
      var h1 = 0,
        h2 = 50,
        ss = $(document).scrollTop()
      $(window).scroll(function () {
        var s = $(document).scrollTop()
        if (s == h1) {
          $('.site-header').removeClass('yya')
        }
        if (s > h1) {
          $('.site-header').addClass('yya')
        }
        if (s > h2) {
          $('.site-header').addClass('gizle')
          if (s > ss) {
            $('.site-header').removeClass('sabit')
          } else {
            $('.site-header').addClass('sabit')
          }
          ss = s
        }
      })
    }, XLS: function () {
      $body = (window.opera) ? (document.compatMode == 'CSS1Compat' ? $('html') : $('body')) : $('html,body')
      $('body').on('click', '#pagination a', function () {
        $(this).addClass('loading').text('')
        $.ajax({
          type: 'GET',
          url: $(this).attr('href') + '#main',
          success: function (data) {
            result = $(data).find('#main .post')
            nextHref = $(data).find('#pagination a').attr('href')
            $('#main').append(result.fadeIn(500))
            $('#pagination a').removeClass('loading').text('Previous')
            lazyload()
            mashiro_global.post_list_show_animation.ini(50)
            if (nextHref != undefined) {
              $('#pagination a').attr('href', nextHref)
            } else {
              $('#pagination').html('<span>很高兴你翻到这里，但是真的没有了...</span>')
            }
          }
        })
        return false
      })
    }, XCS: function () {
      var __cancel = jQuery('#cancel-comment-reply-link'),
        __cancel_text = __cancel.text(),
        __list = 'commentwrap'
      jQuery(document).on('submit', '#commentform', function () {
        jQuery.ajax({
          url: Poi.ajaxurl,
          data: jQuery(this).serialize() + '&action=ajax_comment',
          type: jQuery(this).attr('method'),
          beforeSend: addComment.createButterbar('提交中(Commiting)....'),
          error: function (request) {
            var t = addComment
            t.createButterbar(request.responseText)
          }, success: function (data) {
            jQuery('textarea').each(function () {
                this.value = ''
              })
            var t = addComment,
                cancel = t.I('cancel-comment-reply-link'),
                temp = t.I('wp-temp-form-div'),
                respond = t.I(t.respondId),
                post = t.I('comment_post_ID').value,
                parent = t.I('comment_parent').value
            if (parent != '0') {
                jQuery('#respond').before('<ol class="children">' + data + '</ol>')
              } else if (!jQuery('.' + __list).length) {
                  if (Poi.formpostion == 'bottom') {
                    jQuery('#respond').before('<ol class="' + __list + '">' + data + '</ol>')
                  } else {
                    jQuery('#respond').after('<ol class="' + __list + '">' + data + '</ol>')
                  }
                } else {
                  if (Poi.order == 'asc') {
                    jQuery('.' + __list).append(data)
                  } else {
                    jQuery('.' + __list).prepend(data)
                  }
                }
            t.createButterbar('提交成功(Succeed)')
            lazyload()
            cancel.style.display = 'none'
            cancel.onclick = null
            t.I('comment_parent').value = '0'
            if (temp && respond) {
                temp.parentNode.insertBefore(respond, temp)
                temp.parentNode.removeChild(temp)
              }
          }
        })
        return false
      })
      addComment = {
        moveForm: function (commId, parentId, respondId) {
          var t = this,
            div, comm = t.I(commId),
            respond = t.I(respondId),
            cancel = t.I('cancel-comment-reply-link'),
            parent = t.I('comment_parent'),
            post = t.I('comment_post_ID')
          __cancel.text(__cancel_text)
          t.respondId = respondId
          if (!t.I('wp-temp-form-div')) {
            div = document.createElement('div')
            div.id = 'wp-temp-form-div'
            div.style.display = 'none'
            respond.parentNode.insertBefore(div, respond)
          }!comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling)
          jQuery('body').animate({
            scrollTop: jQuery('#respond').offset().top - 180
          }, 400)
          parent.value = parentId
          cancel.style.display = ''
          cancel.onclick = function () {
            var t = addComment,
              temp = t.I('wp-temp-form-div'),
              respond = t.I(t.respondId)
            t.I('comment_parent').value = '0'
            if (temp && respond) {
              temp.parentNode.insertBefore(respond, temp)
              temp.parentNode.removeChild(temp)
            }
            this.style.display = 'none'
            this.onclick = null
            return false
          }
          try {
            t.I('comment').focus()
          } catch (e) {}
          return false
        }, I: function (e) {
          return document.getElementById(e)
        }, clearButterbar: function (e) {
          if (jQuery('.butterBar').length > 0) {
              jQuery('.butterBar').remove()
            }
        }, createButterbar: function (message, showtime) {
            var t = this
            t.clearButterbar()
            jQuery('body').append('<div class="butterBar butterBar--center"><p class="butterBar-message">' + message + '</p></div>')
            if (showtime > 0) {
                setTimeout("jQuery('.butterBar').remove()", showtime)
              } else {
                setTimeout("jQuery('.butterBar').remove()", 6000)
              }
          }
      }
    },LA: function() {
      if (mashiro_option.leancloud) {
      function showTime(Counter) {
        var query = new AV.Query(Counter);
        var entries = [];
        var $visitors = $(".leancloud_visitors");
    
        $visitors.each(function () {
          entries.push( $(this).attr("id").trim() );
        });
    
        query.containedIn('url', entries);
        query.find()
          .done(function (results) {
            var COUNT_CONTAINER_REF = '.leancloud-visitors-count';
    
            if (results.length === 0) {
              $visitors.find(COUNT_CONTAINER_REF).text(0);
              return;
            }
    
            for (var i = 0; i < results.length; i++) {
              var item = results[i];
              var url = item.get('url');
              var time = item.get('time');
              var element = document.getElementById(url);
    
              $(element).find(COUNT_CONTAINER_REF).text(time);
            }
            for(var i = 0; i < entries.length; i++) {
              var url = entries[i];
              var element = document.getElementById(url);
              var countSpan = $(element).find(COUNT_CONTAINER_REF);
              if( countSpan.text() == '') {
                countSpan.text(0);
              }
            }
          })
          .fail(function (object, error) {
            console.log("Error: " + error.code + " " + error.message);
          });
      }
    
      function addCount(Counter) {
        var $visitors = $(".leancloud_visitors");
        var url = $visitors.attr('id').trim();
        var title = $visitors.attr('data-flag-title').trim();
        var query = new AV.Query(Counter);
    
        query.equalTo("url", url);
        query.find({
          success: function(results) {
            if (results.length > 0) {
              var counter = results[0];
              counter.fetchWhenSave(true);
              counter.increment("time");
              counter.save(null, {
                success: function(counter) {
                  var $element = $(document.getElementById(url));
                  $element.find('.leancloud-visitors-count').text(counter.get('time'));
                },
                error: function(counter, error) {
                  console.log('Failed to save Visitor num, with error message: ' + error.message);
                }
              });
            } else {
              var newcounter = new Counter();
              /* Set ACL */
              var acl = new AV.ACL();
              acl.setPublicReadAccess(true);
              acl.setPublicWriteAccess(true);
              newcounter.setACL(acl);
              /* End Set ACL */
              newcounter.set("title", title);
              newcounter.set("url", url);
              newcounter.set("time", 1);
              newcounter.save(null, {
                success: function(newcounter) {
                  var $element = $(document.getElementById(url));
                  $element.find('.leancloud-visitors-count').text(newcounter.get('time'));
                },
                error: function(newcounter, error) {
                  console.log('Failed to create');
                }
              });
            }
          },
          error: function(error) {
            console.log('Error:' + error.code + " " + error.message);
          }
        });
      }
    
      $(function() {
        var Counter = AV.Object.extend("Counter");
        if ($('.leancloud_visitors').length == 1) {
          addCount(Counter);
        } else if ($('.post-title').length > 1) {
          showTime(Counter);
        }
      });
  
  };
    },PSM: function () {   
      $.getScript('/js/prism.js');
      $.getScript('https://sdk.jinrishici.com/v2/browser/jinrishici.js');
    }, GT: function () {
      var offset = 100,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top')
      $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $back_to_top.addClass('cd-is-visible')
            $('.changeSkin-gear').css('bottom', '0')
            if ($(window).height() > 950) {
                $('.cd-top.cd-is-visible').css('top', '0')
              } else {
                $('.cd-top.cd-is-visible').css('top', ($(window).height() - 950) + 'px')
              }
          } else {
            $('.changeSkin-gear').css('bottom', '-999px')
            $('.cd-top.cd-is-visible').css('top', '-900px')
            $back_to_top.removeClass('cd-is-visible cd-fade-out')
          }
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out')
          }
      })
      $back_to_top.on('click', function (event) {
        event.preventDefault()
        $('body,html').animate({
            scrollTop: 0
          }, scroll_top_duration)
      })
    }
  }
$(function () {
  Siren.NH()
  Siren.GT()
  Siren.XLS()
  Siren.XCS()
  Siren.CE()
  Siren.MN()
  Siren.LV()
  Siren.TOC()
  Siren.PSM()  
  /*Siren.LA() */
  if (window.is_app) injectStyles('#nprogress .bar { display: none; }');
  if (Poi.pjax == '1') {
    $(document).pjax('a[target!=_top]', '#app', {
      fragment: '#app',
      timeout: 8000
    }).on('pjax:send', function () {
      if (document.body.clientWidth >= 860 && !window.is_app &&mashiro_option.Loading){ 
         $('#loading').fadeIn(300)
     }
      $('#bar').css('width', '0%')
      if (mashiro_option.NProgressON == 'true'){ NProgress.start()} 
      Siren.MNH() 
    }).on('pjax:complete', function () {  
      Siren.CE()
      Siren.VA()
      Siren.MJ()
      Siren.PSM()
      Siren.TOC()    
      /*Siren.LA() */  
      if (mashiro_option.NProgressON){NProgress.done()} 
      mashiro_global.ini.pjax()    
      $('#loading').fadeOut(500)    
    }).on('submit', '.search-form,.s-search', function (event) {
      event.preventDefault()
      $.pjax.submit(event, '#app', {
        fragment: '#app',
        timeout: 8000
      })
      if ($('.js-search.is-visible').length > 0) {
        $('.js-toggle-search').toggleClass('is-active')
        $('.js-search').toggleClass('is-visible')
      }
    })
    mashiro_global.lib.pjax_to_url = function (url, ele) {
      $.pjax({
        url: url,
        container: ele,
        fragment: ele,
        timeout: 8000
      })
    }
    window.addEventListener('popstate', function (e) {
      Siren.CE()
      timeSeriesReload(true)
    }, false)
  }
})
var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
  isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
  isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1
if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
  window.addEventListener('hashchange', function () {
    var id = location.hash.substring(1),
      element
    if (!(/^[A-z0-9_-]+$/.test(id))) {
      return
    }
    element = document.getElementById(id)
    if (element) {
      if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
        element.tabIndex = -1
      }
      element.focus()
    }
  }, false)
}

