<div align="center">
<img src="https://raw.githubusercontent.com/Jieiku/abridge/master/abridge.svg"/>

# Abridge Zola Theme

Abridge is a fast and lightweight Zola theme using semantic html, only ~6kb css before the svg icons and syntax highlighting css, no mandatory JS[*](https://github.com/Jieiku/abridge#contributing-and-philosophy), and perfect [Lighthouse](https://web.dev/measure/?url=https%3A%2F%2Fabridge.netlify.app) and [Observatory](https://observatory.mozilla.org/analyze/abridge.netlify.app) scores.

There is also [Abridge-minimal](https://github.com/jieiku/abridge.css) Theme which is used to showcase the [abridge.css framework](https://github.com/Jieiku/abridge.css/tree/master/dist)

Maintainence of this project is made possible by all the <a href="https://github.com/Jieiku/abridge/graphs/contributors">contributors</a> and <a href="https://github.com/sponsors/Jieiku">sponsors</a>. If you'd like to sponsor this project and have your avatar or company logo appear below <a href="https://github.com/sponsors/Jieiku">click here</a>. 💖

<!-- sponsors --><a href="https://github.com/yugfletcher"><img src="https://github.com/yugfletcher.png" width="60px" alt="" /></a><!-- sponsors -->

---

**[View demo](https://abridge.netlify.app/)**

</div>

## Requirements

This theme requires version 0.14.1 or later of [Zola](https://www.getzola.org/documentation/getting-started/installation/)

## Quick Start

```bash
git clone https://github.com/jieiku/abridge.git
cd abridge
zola serve
# open http://127.0.0.1:1111/ in the browser
```

## Installation
The Quick Start shows how to run the theme directly as a site.
Next we will use abridge as a theme to a NEW site.

### Step 1: Create a new zola site

```bash
zola init mysite
```

### Step 2: Install abridge

Download this theme to your themes directory:

```bash
cd mysite/themes
git clone https://github.com/jieiku/abridge.git
```

Or install as a submodule:

```bash
cd mysite
git init  # if your project is a git repository already, ignore this command
git submodule add https://github.com/jieiku/abridge.git themes/abridge
```

### Step 3: Configuration

Enable the theme in your `config.toml` in the site directory:

```toml
theme = "abridge"
```

Or copy the `config.toml` from the theme directory to your project's root directory:
(This will give you a base configuration with all config values used)

```bash
cp themes/abridge/config.toml config.toml
```

Uncomment the theme line, and point extra_syntaxes_and_themes at the correct directory:
```bash
sed -i 's/^#theme = "abridge"/theme = "abridge"/' config.toml
sed -i 's/^extra_syntaxes_and_themes = \["highlight_themes"\]/extra_syntaxes_and_themes = \["highlight_themes", "themes\/abridge\/highlight_themes"\]/' config.toml
```

The result should be:
```toml
theme = "abridge"
[markdown]
extra_syntaxes_and_themes = ["highlight_themes", "themes/abridge/highlight_themes"]
highlight_code = true
highlight_theme = "css"
```

By default abridge uses `highlight_theme = "css"`.

This allows the code block light/dark mode to change with the rest of the site, this also prevents unsafe-inline for style-src in our CSP.

### Step 4: Add new content

You can copy the content from the theme directory to your project:

```bash
cp -r themes/abridge/content .
```

You can modify or add new posts in the content directory as needed.

### Step 5: Run the project

Just run `zola serve` in the root path of the project:

```bash
zola serve
```

Zola will start the development web server making your site accessible by default at
`http://127.0.0.1:1111`. Saved changes will live reload in the browser.

## Customization

You can customize your configurations, templates and content for yourself. Look
at the `config.toml`, `content` files, and templates files in this
repo for an idea.

### Number of Items per page for pagination

To change the number of items per page edit: `abridge/content/_index.md` and change the value for `paginate_by`

### Page width

You can set the overal page width by editing `themes\abridge\sass\_variables.scss` file, and adjusting these two lines:

```scss
$mw:50% !default;// max-width
$mb:1200px !default;// value at which to switch from fluid layout to using max-width
```

### Colors and Styles

Colors and style are handled by the sass files of [abridge.css](https://github.com/jieiku/abridge.css)

Abridge comes with "Skins" each with their own auto, dark, light and switcher modes.
Auto mode automatically displays a dark or light version depending on browser/OS settings.
Switcher mode automatically displays a dark or light version depending on browser/OS settings, and has a user clickable theme switcher, but it requires additional javascript.

The skin used on [the Demo](https://abridge.netlify.app/) uses primarily orange colors.
It is defined here: `/themes/abridge/sass/abridge-switcher.scss`

There is also other variations, that you will see defined in this same directory, they are also all defined in config.toml

To change colors or fonts all you need to do is edit these files or duplicate them and create your own skin.
Then in the root of your site type `zola build` which will regenerate your site, this is similar to what zola serve does, except it does not facilitate serving the site.

### Javascript Files, js_bundle and options

These are the javascript files currently used by Abridge:

- search_index.en.js: search index generated by zola at each build for elasticlunr.
- elasticlunr.min.js: search library for client side searching.
- search.js: to make use of elasticlunr from our sites search box for both suggestions and the results page.
- theme.js: very tiny script to facilitate local storage for the theme switcher. (never bundle, gets loaded separate)
- theme_button.js: tiny script for the theme switcher function when you click the theme switch button.
- prestyle.js: Used to preload css files `<link rel="preload"` - this script changes these to `<link rel="stylesheet"` once the page has finished loading, this allows us to load stylesheets for external fonts, fontawesome, or katex in a non blocking fashion.

js_bundle is set to a javascript file with a bundle of multiple javascript files, this allows us to serve fewer javascript files (only the search index and the bundle). Included are a few of the likely most commonly used combinations, but you can generate these yourself using uglifyjs if you need to, there are examples in the config.toml, eg:

`uglifyjs prestyle.js theme_button.js elasticlunr.min.js search.js -o abridge-switcher.min.js -c -m`

- search.min.js - includes: elasticlunr, search.
- abridge.min.js - includes: prestyle, elasticlunr, search.
- abridge-switcher.min.js: includes: prestyle, theme_button, elasticlunr, search.


### Global Configuration

There are some configuration options that you can customize in `config.toml`.

#### Configuration options before `extra` options

Set the authors's taxonomies for the site.

```toml
taxonomies = [
  {name = "authors"},
]
```

Use search function for the content.

```toml
build_search_index = true
```

​The search is the only essential thing that requires javascript in this this theme.

If you set `build_search_index` to false then the javascript file will no longer be loaded.

The default elasticlunr search is currently used, I may eventually switch this out for something else.

#### Configuration options under the `extra`

Most Options in the config.toml are self documenting, meaning between the name of the config value and the notes in the file it is usually obvious what an option is for.

The following options should be under the `[extra]` in `config.toml`

- `uglyurls` - Set to true, as well as set a file path for base_url to support a local offline mode of your site, you can then browse your site directly from disk.
- `language_code` - Set the site language_code.
- `title_separator` - Separator between title and title_addition, eg "|": "Abridge | Fast & Lightweight Zola Theme"
- `title_addition` - a default value for title addition, used at the index.
- `recent = true` - This enabled the Recent posts box visible on the top right.
- `recent_items = 9` - The number of items to display in the recent posts box
- `author` - Used for articles to denote the author.

- `title_size_index` - Size of the Titles Font on the Index: s95, s90, s85, s80, s75, s70, false(full size)
- `meta_index / meta_post`
    * `position` - top, bottom, both, false(hidden), Where to display the meta info in relation to the summary.
    * `size` - s95, s90, s85, s80, false(full size). The size of the font for the meta info
    * `author` - true/false, Display the author in the meta info.
    * `readtime` - true/false, Display the read time in the meta info.
    * `readstring` - "min", "min read", "minutes read". The string to display after the read time.
    * `date` - true/false, Display the date in the meta info.
    * `categories_tags` - true/false, Display the categores and tags in the meta info.
    * `divider` - `"&middot;"`   `"&bull;"`   `" "`  divider to display between meta info elements.

- `footer_size` - Size of the Footer Font: s95, s90, s85, s80, s75, s70, false(full size)
- `footer_credit = true` - This enables the powered by zola and abridge line in the footer.
- `footer_credit_override` - Can be used to customize the footer credit, useful to add icons to the text, etc.
- `logo = { file="logo.svg", width="42", height="42", alt="Abridge", text="bridge" }` - Defines the graphical logo with optional text to follow the logo.
- `textlogo` - A purely Text based logo, this will be used if logo is commented out, if both are commented out then config.title is used.
- `sitedesc` - This adds the site description just below the text based logo.
- `copyright_start_year` - Optionally define a start year for the copyright, otherwise the current year is used.
- `copyright_end_year` - Optionally set the copyright end year, recommend leaving unset, zola build will set this to current year by default
- `headhr` - Display a horizontal rule below header
- `foothr` - Display a horizontal rule above footer
- `menu` - This is an array of links to display at the top right corner of the page
- `menu_footer` - This is an array of links to display in the footer of the page

- `security_header_referrer` - This is mostly used for tracking, the default is set to "strict-origin-when-cross-origin" [info](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
- `security_header_csp` - Content Security policy, to enfore security rules: [observatory](https://observatory.mozilla.org), [csp-google](https://csp-evaluator.withgoogle.com/)

- `js_search_index` - The search index file to include in the header, comment out to disable.
- `js_prestyle` - The script file used to preload: FontAwesome, Katex, external Google Fonts.
- `js_search` - The search script file to include in the header, comment out to disable.

- `js_theme` - Used for the Theme Switcher, to facilitate localstorage.
- `js_themeButton` - Used for the Theme Switcher.
- `js_bundle` - Used to define a javascript bundle, [more information](https://github.com/Jieiku/abridge#javascript-files-js_bundle-and-options).
- `stylesheets = [ "abridge.css" ]` - The stylesheet file(s) to include in the header.

- `banner` - Image to use in seo related cards, this will be the fallback image if the individual articles does not provide one.
- `favicon_...` - Used to set the various favicons (displayed in bookmarks and active browser tab)
- `fontawesome =` - Uncomment to enable fontawesome library, this will include the file in the header.
    * `icon_read` - icon to display in meta info on index and posts, comment out to disable
    * `icon_date` - icon to display in meta info on index and posts, comment out to disable
    * `icon_info` - icon to display in meta info on index and posts, comment out to disable
    * `icon_author` - icon to display in meta info on index and posts, comment out to disable

- `fonts =` - Uncomment to load external fonts, they will be loaded in the header.
- `math` - Set to true to load the Katex library, enabling the use of the [katex shortcode](https://abridge.netlify.app/overview-math/) (recommend setting on a per page basis instead.)
- `math_auto_render` - This allows you to define a section of math notation using only $$ $$ symbols instead of using the katex shortcode directly. (recommend setting on a per page basis instead.)

- `katex_css`, `katex_js`, `mathtex_js`, `katex_autorender_js`, `katex_options` - Used for Math Notation.
- `katex_bundle` - Used to bundle all of the math related js.

- `keywords =` - This is used for SEO.
- `seo =` - This is used for SEO, for the social media related tags, eg: opengraph, facebook, twitter if set to false it disables them all.
- `extra.social` - These are the options for the social icons in the footer, and a couple are also used in SEO related meta tags.

Additionally you should configure which social icons you plan to use. (makes the css file size smaller)

open `themes/abridge/sass/_variables.scss`

To simply turn them all off you can set `$enable-icons: false`
Otherwise to turn on only the ones you need you would set `$enable-icons: true`
Then enable only the icons you need, eg for mail you would set `$icon-mail: true`
You should then disable all the icons that you do not use, as this will decrease the final size of your css file.
The difference in size is NOT a lot, without icons its ~4kb, with all the social icons its ~12kb.
There are also some general purpose icons you can use, they are disabled by default.

The theme requires tags and categories taxonomies to be enabled in your `config.toml`:

```toml
taxonomies = [
    # You can enable/disable RSS
    {name = "categories", rss = true},
    {name = "tags", rss = true},
]
```

### Top and Footer menus
Set a field in `extra` with a key of `menu` and `menu_footer`.
If a link should have a trailing slash at the end of the url set `slash = true`.

```toml
# This is the default menu
menu = [
    {url = "/", name = "Home", slash = true},
    {url = "/about/", name = "About", slash = true},
    {url = "/posts/", name = "Posts", slash = true},
    {url = "/categories/", name = "Categories", slash = true},
    {url = "/tags/", name = "Tags", slash = true},
]
menu_footer = [
    {url = "/", name = "Home", slash = true},
    {url = "/about/", name = "About", slash = true},
    {url = "/contact/", name = "Contact", slash = true},
    {url = "/privacy/", name = "Privacy", slash = true},
    {url = "/sitemap.xml", name = "Sitemap", slash = false},
]
```

### SEO and Header Tags

Most SEO Tags have been added as well as some important head tags for browser compatibility.

You can review the SEO tags in the head macro located at `templates/macros/head.html`, all configurable values should be in config.toml under config.extra or in the content markdown files.

In your post markdown file you should set a title less than 60 characters and a description between 80 and 160 characters in length. The description is what is displayed in search results below the page title. Anywhere that you do not set a page description, the primary site config.description will be used instead.

You should also set page specific keywords unless your keywords defined in config.toml suffice, any keywords that you add to the page are in addition to the ones defined in config.toml, so do not add those same keywords to your page keywords.

You can optionally also set a page specific image for search results by using page.extra.thumbnail. OpenGraph recommends 1200 x 630 (1.9:1). Twitter recommends 2:1 for large and 1:1 for small. If you do not set a page specific thumbnail then the banner defined in config.toml will be used instead.

Refer to [overview-images](https://raw.githubusercontent.com/Jieiku/abridge/master/content/overview-images/index.md) for an example:
```md
+++
title = "Image Shortcodes"
description = "Images can be embeded directly using markdown `![Ferris](ferris.svg)`, but using a shortcode prevents CLS by explicitly setting the width and height."
date = 2021-05-19

[taxonomies]
categories = ["Features"]
tags = ["shortcodes","images"]
[extra]
toc = true
keywords = "Image, Markdown, Shortcodes, Hover"
thumbnail = "ferris-gesture.png"
+++
```

There are tools you can use to test your page SEO metadata, such as: [smallseotools.com](https://smallseotools.com/meta-tags-analyzer/)

### KaTeX Math Notation

KaTeX can be used to display complex mathematics, it is a "Fast math typesetting for the web."

You can see a demo on [this page](https://abridge.netlify.app/overview-math/).

I recommend only enabling math on a per page bases in your post.md files, instead of in your main config.toml file.

### Templates

All pages extend to `base.html`, and you can customize them as need.

## Optional Performance Optimizations:

### Theme-Switcher

The theme switcher relies on javascript to work, it applies the .light class to the root documentElement. The file that handles this (theme.js) is tiny and optimized and it is the first file loaded in the head, so the performance hit is minimal, but it does still exist. Without the Theme switcher you can still use The automatic Theme, it works by using Browser/OS preference, you can even install a [Firefox plugin](https://addons.mozilla.org/en-US/firefox/addon/theme-switcher-for-firefox/) to quickly switch between the two. By default the demo has the theme switcher enabled so that it can be evaluated.

With the growing number of options and configuration it can get confusing. To disable the Theme Switcher, you would comment out the Switcher section and enable your choice in the No switcher section, for example:

```toml
########## Switcher ########## (comment this block out if NOT using switcher):
#js_theme = "theme.min.js" # Separate Always, comment out if using -auto/-light/-dark stylesheet. (required for switcher)
#js_themeButton = "theme_button.js"# Bundleable
#js_bundle = "abridge-switcher.min.js"# Bundle JS File, comment out to disable (includes switcher)
#stylesheets = [ "abridge-switcher.css" ] # Orange Automatic Dark/Light Theme based on browser/system preference with switcher
#stylesheets = [ "abridge-blue-switcher.css" ] # Blue Automatic Night/Light Theme based on browser/system preference with switcher
#stylesheets = [ "abridge-blueshade-switcher.css" ] # BlueShade Automatic Night/Light Theme based on browser/system preference with switcher

########## No Switcher ##########
#js_bundle = "search.min.js"# Bundle JS File, comment out to disable (search only: no switcher/prestyle)
js_bundle = "abridge.min.js"# Bundle JS File, comment out to disable (no switcher)
stylesheets = [ "abridge.css" ] # Orange Automatic Dark/Light Theme based on browser/system preference
```

### Optimize PNG files:

All png files can be optimized using [oxipng](https://github.com/shssoichiro/oxipng), this usually results in files 1/2 the size:

```bash
cd static
oxipng -o max --strip all -a -Z *.png
```

You can go even farther if you use leanify:

```bash
git clone https://github.com/JayXon/Leanify
cd Leanify
make
sudo cp leanify /usr/local/bin/leanify
exit  #launch new terminal
leanify -i 7777 *.png
leanify -i 7777 *.ico
```

Results of using leanify on files previously processed with oxipng (smaller favicons compressed a lot more):

```bash
Processing: android-chrome-192x192m.png
2.23 KB -> 2.22 KB      Leanified: 11 B (0.48%)
Processing: android-chrome-192x192.png
2.51 KB -> 2.48 KB      Leanified: 33 B (1.28%)
Processing: android-chrome-512x512.png
5.49 KB -> 5.25 KB      Leanified: 241 B **(4.29%)**
Processing: apple-touch-icon.png
2.57 KB -> 2.54 KB      Leanified: 30 B (1.14%)
Processing: banner.png
13.07 KB -> 12.93 KB    Leanified: 138 B (1.03%)
Processing: mstile-150x150.png
2.24 KB -> 2.20 KB      Leanified: 38 B (1.66%)
Processing: favicon-16x16.png
559 B -> 366 B  Leanified: 193 B **(34.53%)**
Processing: favicon-32x32.png
969 B -> 663 B  Leanified: 306 B **(31.58%)**
Processing: favicon.ico
2.59 KB -> 1.90 KB      Leanified: 703 B **(26.53%)**
```

Google lighthouse will often notice when your pictures could be more compressed, this may even help SEO.


### Pre gzip/brotli content to serve with nginx:

If you are serving your site with nginx, you can pre gzip your content.

First configure nginx:

```bash
sudo nano /etc/nginx/nginx.conf

gzip on;
gzip_vary on;
gzip_proxied expired no-cache no-store private auth;
#gzip_proxied any;
gzip_comp_level 9;
gzip_buffers 64 16k;
#gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml application/xhtml+xml application/x-javascript application/x-font-ttf application/vnd.ms-fontobject font/opentype font/ttf font/eot font/otf;
#gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

Then you can gzip/brotli your files:
```bash
zola build
find ~/.dev/abridge/public -type f -regextype posix-extended -regex '.*\.(htm|html|css|js|xml|xsl|txt|woff|woff2|svg|otf|eot|ttf)' -exec gzip --best -k -f {} \+ -exec brotli --best -f {} \;
rsync -zvrh ~/.dev/abridge/public/ web:/var/www/abridge
```

Nginx does not come by default with brotli support, but adding it was not difficult.

## Reporting Issues

We use GitHub Issues as the official bug tracker for **abridge**.
Please search [existing issues](https://github.com/jieiku/abridge/issues).
It’s possible someone has already reported the same problem.
If your problem or idea is not addressed yet, [open a new issue](https://github.com/jieiku/abridge/issues/new).

## Contributing and Philosophy

We'd love your help! Especially with fixes to issues.

The overall idea behind abridge is to be lightweight and fast, and to work properly even if javascript is disabled.

The only feature that some people may consider a necessity that relies on javascript is the Search.

Any feature added to abridge that relies on javascript will do so with it disabled by default.

## License

**abridge** is distributed under the terms of the
[MIT license](https://github.com/jieiku/abridge/blob/master/LICENSE).
