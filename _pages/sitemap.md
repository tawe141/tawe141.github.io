---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
sitemap: false
---

{% include base_path %}

A list of all the posts and pages found on the site. For you robots out there, there is an [XML version]({{ base_path }}/sitemap.xml) available for digesting as well.

<h2>Pages</h2>
{% for post in site.pages %}
  {% unless post.sitemap == false or post.title == blank %}
    {% include archive-single.html %}
  {% endunless %}
{% endfor %}

{% assign visible_posts = 0 %}
{% for post in site.posts %}
  {% unless post.sitemap == false %}
    {% assign visible_posts = visible_posts | plus: 1 %}
  {% endunless %}
{% endfor %}
{% if visible_posts > 0 %}
<h2>Posts</h2>
{% for post in site.posts %}
  {% unless post.sitemap == false %}
    {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endif %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% assign visible_docs = 0 %}
  {% for post in collection.docs %}
    {% unless post.sitemap == false %}
      {% assign visible_docs = visible_docs | plus: 1 %}
    {% endunless %}
  {% endfor %}
  {% if visible_docs > 0 %}
  <h2>{{ collection.label }}</h2>
  {% for post in collection.docs %}
    {% unless post.sitemap == false %}
    {% include archive-single.html %}
    {% endunless %}
  {% endfor %}
  {% endif %}
{% endunless %}
{% endfor %}
