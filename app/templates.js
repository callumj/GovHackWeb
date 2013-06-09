this["Templates"] = this["Templates"] || {};

this["Templates"]["templates/question_view.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n    <input class=\"next true ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.hideable || depth0.hideable),stack1 ? stack1.call(depth0, true, options) : helperMissing.call(depth0, "hideable", true, options)))
    + "\"  type=\"button\" value=\"Yes\" />\n    <input class=\"next false ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.hideable || depth0.hideable),stack1 ? stack1.call(depth0, false, options) : helperMissing.call(depth0, "hideable", false, options)))
    + "\" type=\"button\" value=\"No\" />\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n    <input type=\"text\" name=\"response\" />\n    <input class=\"next\" type=\"submit\" value=\"Next\" />\n  ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.each.call(depth0, depth0.multiValues, {hash:{},inverse:self.noop,fn:self.programWithDepth(6, program6, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program6(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n      <input class=\"next true ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.hideable || depth0.hideable),stack1 ? stack1.call(depth0, depth0.key, depth1, options) : helperMissing.call(depth0, "hideable", depth0.key, depth1, options)))
    + "\"  type=\"button\" value=\"";
  if (stack2 = helpers['s']) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0['s']; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-val=\"";
  if (stack2 = helpers.key) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.key; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" />\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <select name=\"value\" class=\"drop\">\n      <option value=\"null\">Select Your Range. </option>\n      ";
  stack1 = helpers.each.call(depth0, depth0.multiValues, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n  ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers['s']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['s']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</option>\n      ";
  return buffer;
  }

  buffer += "<label>";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</label>\n<div class=\"buttons\">\n  <input type=\"hidden\" name=\"key\" value=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n  ";
  stack1 = helpers['if'].call(depth0, depth0.isBool, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.isString, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.isMulti, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.isMultiDrop, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });

this["Templates"]["templates/suburb_info_view.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article class=\"photo\" style=\"background-image: url(";
  if (stack1 = helpers.streetViewImage) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.streetViewImage; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ");\">\n<div id=\"results-share\" class=\"open\">\n  <ul>\n    <li><span style=\"background-position: 1px 4px;\"></span>Share</li>\n    <li><a href=\"#\"><span style=\"background-position: 1px -40px;\"></span>Twitter</a></li>\n    <li><a href=\"#\"><span style=\"background-position: 1px -89px;\"></span>Facebook</a></li>\n    <li><a href=\"mailto:?subject=Check out Malands!\"><span style=\"background-position: 1px -135px;\"></span>Email</a></li>\n  </ul>\n</div>\n\n<a href=\"#\" id=\"close-results\">back</a>\n\n <h1>";
  if (stack1 = helpers.suburbName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.suburbName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n <h3>";
  if (stack1 = helpers.postCode) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.postCode; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ", Western Australia</h3>\n</article>\n\n<article>\n <h2>About</h2>\n  ";
  if (stack1 = helpers.suburbInfo) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.suburbInfo; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n  <a href=\"#\">Read More</a>\n</article>\n\n<article>\n<span class=\"icon\" style=\"background-image:url('../images/graph-icon.png')\"></span>\n<h2>Overview</h2>\n<ul>\n  <li><strong>";
  if (stack1 = helpers.population) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.population; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>Population</li>\n  <li><strong>";
  if (stack1 = helpers.sizeSquared) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sizeSquared; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>Size (km2)</li>\n</ul>\n\n<!-- <div class=\"chart-col\">\n  <canvas class=\"chart\" data-type=\"Bar\" width=\"253\"></canvas>\n  <canvas class=\"chart\" data-type=\"Doughnut\" width=\"253\"></canvas>\n</div> -->\n\n<ul>\n  <li><strong>";
  if (stack1 = helpers.avgAge) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avgAge; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>Average Age</li>\n  <li><strong>";
  if (stack1 = helpers.percentFemale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.percentFemale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":";
  if (stack1 = helpers.percentMale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.percentMale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>Male: Female ratio</li>\n  <li><strong>";
  if (stack1 = helpers.avgSalary) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avgSalary; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>Average Income</li>\n  <li><strong>";
  if (stack1 = helpers.nbnLastWorkCommenceYear) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nbnLastWorkCommenceYear; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>NBN Completion</li>\n  <li><strong>Great</strong>Transport Access</li>\n</ul>\n\n</article>\n\n<article>\n<span class=\"icon\" style=\"background-image:url('img/house-icon.png')\"></span>\n<ul>\n  <li><strong>";
  if (stack1 = helpers.avgCostPurchase) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avgCostPurchase; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>House Sale Median</li>\n</ul>\n\n</article>\n\n";
  return buffer;
  });