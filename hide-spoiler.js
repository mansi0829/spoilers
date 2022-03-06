keyWord = [
  "Peaky Blinders",
  "peaky blinders",
  "PEAKY BLINDERS",
  "IRON MAN",
  "Iron Man",
  "iron man",
  "MARVEL STUDIO",
  "Marvel Studio",
  "marvel studio",
  "Marvel",
  "MARVEL",
  "death",
  "DEAD",
  "Dead",
  "Died",
  "DEATH",
  "Death",
  "DIED",
];
tags = "SPANEMBIULOLI";
total = 0;

//to parse the whole web page of your browser

for (var j = 0; j < keyWord.length; j++) {
  o = $(`:contains(${keyWord[j]}):not(:has(:contains(${keyWord[j]})))`);
  for (var i = 0; i < o.length; i++) {
    if (!o[i].parentNode || o[i].parentNode.nodeName === "BODY") {
      continue;
    }
    hideSpoiler(o[i]);
    total++;
  }
}

if (total >= 10) {
  headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  for (var i = 0; i < headings.length; i++) hideNode(headings[i]);
}

//to hide the content related to keyword mentioned

function hideSpoiler(node) {
  ancestor = node.parentNode;
  if (ancestor != null) {
    if (ancestor.parentNode != null && ancestor.tagName != "BODY")
      ancestor = ancestor.parentNode;
    imgs = ancestor.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++)
      imgs[i].style.webkitFilter = "blur(10px)";
    lists = ancestor.getElementsByTagName("li");
    for (var i = 0; i < lists.length; i++) hideNode(lists[i]);
  }

  if (node == null || node.parentNode == null) return;
  all_child = node.parentNode.children;
  for (var i = 0; i < all_child; i++) {
    var type = all_child[i].tagName;
    if (tags.match(type) != null) hideNode(all_child[i]);
  }
  hideNode(node);
}

//warning added if related content detected

function hideNode(node) {
  node.textContent = "[TEXT BLOCKED: SPOILER DETECTED]";
  node.style.color = "red";
}
