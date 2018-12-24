/ **
 *版权所有（C）2010-2015 Graham Breach
 *
 *此程序是免费软件：您可以重新分发和/或修改
 *根据GNU较宽松通用公共许可证的条款发布
 *自由软件基金会，许可证的第3版，或
 *（根据您的选择）任何更高版本。
 *
 *该程序的分发是希望它有用，
 *但没有任何担保; 甚至没有暗示的保证
 *适销性或特定用途的适用性。见
 * GNU较宽松通用公共许可证了解更多详情。
 *
 *您应该已收到GNU宽通用公共许可证的副本
 *以及该计划。如果没有，请参阅<http://www.gnu.org/licenses/>。
 * /
/ **
 * TagCanvas 2.9
 *如需了解更多信息，请联系<graham@goat1000.com>
 * /
（功能（）{
“严格使用”;
var i，j，abs = Math.abs，sin = Math.sin，cos = Math.cos，max = Math.max，
  min = Math.min，ceil = Math.ceil，sqrt = Math.sqrt，pow = Math.pow，
  hexlookup3 = {}，hexlookup2 = {}，hexlookup1 = {
  0：“0”，1：“17，”，2：“34，”，3：“51，”，4：“68，”，5：“85，”，
  6：“102”，“7：”119，“，8：”136，“，9：”153，“，a：”170，“，A：”170，“，
  b：“187”，B：“187”，c：“204”，C：“204”，“d：”221，“，D：”221，“，
  e：“238，”，E：“238，”，f：“255，”，F：“255，”
  }，Oproto，Tproto，TCproto，Mproto，Vproto，TSproto，TCVproto，
  doc = document，ocanvas，handlers = {};
for（i = 0; i <256; ++ i）{
  j = i.toString（16）;
  if（i <16）
    j ='0'+ j;
  hexlookup2 [j] = hexlookup2 [j.toUpperCase（）] = i.toString（）+'，';
}
函数定义（d）{
  return typeof d！='undefined';
}
function IsObject（o）{
  return typeof o =='object'&& o！= null;
}
function Clamp（v，mn，mx）{
  return isNaN（v）？mx：min（mx，max（mn，v））;
}
function Nop（）{
  返回虚假;
}
function TimeNow（）{
  return new Date（）。valueOf（）;
}
function SortList（l，f）{
  var nl = []，tl = l.length，i;
  for（i = 0; i <tl; ++ i）
    nl.push（L [1]）;
  nl.sort（F）;
  返回nl;
}
function Shuffle（a）{
  var i = a.length-1，t，p;
  当我） {
    p = ~~（Math.random（）* i）;
    t = a [i];
    a [i] = a [p];
    a [p] = t;
    - 一世;
  }
}
function Vector（x，y，z）{
  this.x = x;
  this.y = y;
  this.z = z;
}
Vproto = Vector.prototype;
Vproto.length = function（）{
  return sqrt（this.x * this.x + this.y * this.y + this.z * this.z）;
};
Vproto.dot = function（v）{
  返回this.x * vx + this.y * vy + this.z * vz;
};
Vproto.cross = function（v）{
  var x = this.y * vz  -  this.z * vy，
    y = this.z * vx  -  this.x * vz，
    z = this.x * vy  -  this.y * vx;
  返回新的Vector（x，y，z）;
};
Vproto.angle = function（v）{
  var dot = this.dot（v），ac;
  if（dot == 0）
    返回Math.PI / 2.0;
  ac = dot /（this.length（）* v.length（））;
  if（ac> = 1）
    返回0;
  if（ac <= -1）
    返回Math.PI;
  返回Math.acos（ac）;
};
Vproto.unit = function（）{
  var l = this.length（）;
  返回new Vector（this.x / l，this.y / l，this.z / l）;
};
function MakeVector（lg，lt）{
  lt = lt * Math.PI / 180;
  lg = lg * Math.PI / 180;
  var x = sin（lg）* cos（lt），y = -sin（lt），z = -cos（lg）* cos（lt）;
  返回新的Vector（x，y，z）;
}
功能矩阵（a）{
  这[1] = {1：a [0]，2：a [1]，3：a [2]};
  这[2] = {1：a [3]，2：a [4]，3：a [5]};
  这[3] = {1：a [6]，2：a [7]，3：a [8]};
}
Mproto = Matrix.prototype;
Matrix.Identity = function（）{
  返回新矩阵（[1,0,0,0,1,0,0,0,1]）;
};
Matrix.Rotation = function（angle，u）{
  var sina = sin（角度），cosa = cos（角度），mcos = 1  -  cosa;
  返回新矩阵（[
    cosa + pow（ux，2）* mcos，ux * uy * mcos  -  uz * sina，ux * uz * mcos + uy * sina，
    uy * ux * mcos + uz * sina，cosa + pow（uy，2）* mcos，uy * uz * mcos  -  ux * sina，
    uz * ux * mcos  -  uy * sina，uz * uy * mcos + ux * sina，cosa + pow（uz，2）* mcos
  ]）;
}
Mproto.mul = function（m）{
  var a = []，i，j，mmatrix =（m.xform？1：0）;
  for（i = 1; i <= 3; ++ i）
    for（j = 1; j <= 3; ++ j）{
      如果（mmatrix）
        a.push（this [i] [1] * m [1] [j] +
          this[i][2] * m[2][j] +
          this[i][3] * m[3][j]);
      else
        a.push(this[i][j] * m);
    }
  return new Matrix(a);
};
Mproto.xform = function(p) {
  var a = {}, x = p.x, y = p.y, z = p.z;
  a.x = x * this[1][1] + y * this[2][1] + z * this[3][1];
  a.y = x * this[1][2] + y * this[2][2] + z * this[3][2];
  a.z = x * this[1][3] + y * this[2][3] + z * this[3][3];
  return a;
};
function PointsOnSphere(n,xr,yr,zr,magic) {
  var i, y, r, phi, pts = [], off = 2/n, inc;
  inc = Math.PI * (3 - sqrt(5) + (parseFloat(magic) ? parseFloat(magic) : 0));
  for(i = 0; i < n; ++i) {
    y = i * off - 1 + (off / 2);
    r = sqrt(1 - y*y);
    phi = i * inc;
    pts.push([cos(phi) * r * xr, y * yr, sin(phi) * r * zr]);
  }
  return pts;
}
function Cylinder(n,o,xr,yr,zr,magic) {
  var phi, pts = [], off = 2/n, inc, i, j, k, l;
  inc = Math.PI * (3 - sqrt(5) + (parseFloat(magic) ? parseFloat(magic) : 0));
  for(i = 0; i < n; ++i) {
    j = i * off - 1 + (off / 2);
    phi = i * inc;
    k = cos(phi);
    l = sin(phi);
    pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
  }
  return pts;
}
function Ring(o, n, xr, yr, zr, j) {
  var phi, pts = [], inc = Math.PI * 2 / n, i, k, l;
  for(i = 0; i < n; ++i) {
    phi = i * inc;
    k = cos(phi);
    l = sin(phi);
    pts.push(o ? [j * xr, k * yr, l * zr] : [k * xr, j * yr, l * zr]);
  }
  return pts;
}
function PointsOnCylinderV(n,xr,yr,zr,m) { return Cylinder(n, 0, xr, yr, zr, m) }
function PointsOnCylinderH(n,xr,yr,zr,m) { return Cylinder(n, 1, xr, yr, zr, m) }
function PointsOnRingV(n, xr, yr, zr, offset) {
  offset = isNaN(offset) ? 0 : offset * 1;
  return Ring(0, n, xr, yr, zr, offset);
}
function PointsOnRingH(n, xr, yr, zr, offset) {
  offset = isNaN(offset) ? 0 : offset * 1;
  return Ring(1, n, xr, yr, zr, offset);
}
function CentreImage(t) {
  var i = new Image;
  i.onload = function() {
    var dx = i.width / 2, dy = i.height / 2;
    t.centreFunc = function(c, w, h, cx, cy) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalAlpha = 1;
      c.drawImage(i, cx - dx, cy - dy);
    };
  };
  i.src = t.centreImage;
}
function SetAlpha(c,a) {
  var d = c, p1, p2, ae = (a*1).toPrecision(3) + ')';
  if(c[0] === '#') {
    if(!hexlookup3[c])
      if(c.length === 4)
        hexlookup3[c] = 'rgba(' + hexlookup1[c[1]] + hexlookup1[c[2]] + hexlookup1[c[3]];
      else
        hexlookup3[c] = 'rgba(' + hexlookup2[c.substr(1,2)] + hexlookup2[c.substr(3,2)] + hexlookup2[c.substr(5,2)];
    d = hexlookup3[c] + ae;
  } else if(c.substr(0,4) === 'rgb(' || c.substr(0,4) === 'hsl(') {
    d = (c.replace('(','a(').replace(')', ',' + ae));
  } else if(c.substr(0,5) === 'rgba(' || c.substr(0,5) === 'hsla(') {
    p1 = c.lastIndexOf(',') + 1, p2 = c.indexOf(')');
    a *= parseFloat(c.substring(p1,p2));
    d = c.substr(0,p1) + a.toPrecision(3) + ')';
  }
  return d;
}
function NewCanvas(w,h) {
  // if using excanvas, give up now
  if(window.G_vmlCanvasManager)
    return null;
  var c = doc.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}
// I think all browsers pass this test now...
function ShadowAlphaBroken() {
  var cv = NewCanvas(3,3), c, i;
  if(!cv)
    return false;
  c = cv.getContext('2d');
  c.strokeStyle = '#000';
  c.shadowColor = '#fff';
  c.shadowBlur = 3;
  c.globalAlpha = 0;
  c.strokeRect(2,2,2,2);
  c.globalAlpha = 1;
  i = c.getImageData(2,2,1,1);
  cv = null;
  return (i.data[0] > 0);
}
function SetGradient(c, l, o, g) {
  var gd = c.createLinearGradient(0, 0, l, 0), i;
  for(i in g)
    gd.addColorStop(1 - i, g[i]);
  c.fillStyle = gd;
  c.fillRect(0, o, l, 1);
}
function FindGradientColour(tc, p, r) {
  var l = 1024, h = 1, gl = tc.weightGradient, cv, c, i, d;
  if(tc.gCanvas) {
    c = tc.gCanvas.getContext('2d');
    h = tc.gCanvas.height;
  } else {
    if(IsObject(gl[0]))
      h = gl.length;
    else
      gl = [gl];
    tc.gCanvas = cv = NewCanvas(l, h);
    if(!cv)
      return null;
    c = cv.getContext('2d');
    for(i = 0; i < h; ++i)
      SetGradient(c, l, i, gl[i]);
  }
  r = max(min(r || 0, h - 1), 0);
  d = c.getImageData(~~((l - 1) * p), r, 1, 1).data;
  return 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3]/255) + ')';
}
函数TextSet（ctxt，font，color，strings，padx，pady，shadowColour，
  shadowBlur，shadowOffsets，maxWidth，widths，align）{
  var xo = padx +（shadowBlur || 0）+
    （shadowOffsets.length && shadowOffsets [0] <0？abs（shadowOffsets [0]）：0），
    yo = pady +（shadowBlur || 0）+
    （shadowOffsets.length && shadowOffsets [1] <0？abs（shadowOffsets [1]）：0），i，xc;
  ctxt.font = font;
  ctxt.textBaseline ='top';
  ctxt.fillStyle = color;
  shadowColour &&（ctxt.shadowColor = shadowColour）;
  shadowBlur &&（ctxt.shadowBlur = shadowBlur）;
  shadowOffsets.length &&（ctxt.shadowOffsetX = shadowOffsets [0]，
    ctxt.shadowOffsetY = shadowOffsets [1]）;
  for（i = 0; i <strings.length; ++ i）{
    xc = 0;
    if（widths）{
      if（'right'== align）{
        xc = maxWidth  -  widths [i];
      } else if（'center'== align）{
        xc =（maxWidth  -  widths [i]）/ 2;
      }
    }
    ctxt.fillText（strings [i]，xo + xc，yo）;
    yo + = parseInt（font）;
  }
}
功能RRect（c，x，y，w，h，r，s）{
  if（r）{
    c.beginPath（）;
    c.moveTo（x，y + h  -  r）;
    c.arcTo（x，y，x + r，y，r）;
    c.arcTo（x + w，y，x + w，y + r，r）;
    c.arcTo（x + w，y + h，x + w  -  r，y + h，r）;
    c.arcTo（x，y + h，x，y + h  -  r，r）;
    c.closePath（）;
    c [s？'stroke'：'fill']（）;
  } else {
    c [s？'strokeRect'：'fillRect']（x，y，w，h）;
  }
}
函数TextCanvas（字符串，字体，w，h，maxWidth，stringWidths，align，valign，
  比例）{
  this.strings = strings;
  this.font = font;
  this.width = w;
  this.height = h;
  this.maxWidth = maxWidth;
  this.stringWidths = stringWidths;
  this.align = align;
  this.valign = valign;
  this.scale = scale;
}
TCVproto = TextCanvas.prototype;
TCVproto.SetImage = function（image，w，h，position，padding，align，valign，
  比例）{
  this.image = image;
  this.iwidth = w * this.scale;
  this.iheight = h * this.scale;
  this.ipos = position;
  this.ipad = padding * this.scale;
  this.iscale = scale;
  this.ialign = align;
  this.ivalign = valign;
};
TCVproto.Align = function（size，space，a）{
  var pos = 0;
  if（a =='right'|| a =='bottom'）
    pos = space-size;
  否则如果（a！='left'&& a！='top'）
    pos =（space-size）/ 2;
  返回pos;
};
TCVproto.Create = function（color，bgColour，bgOutline，bgOutlineThickness，
  shadowColour，shadowBlur，shadowOffsets，padding，radius）{
  var cv，cw，ch，c，x1，x2，y1，y2，offx，offy，ix，iy，iw，ih，rr，
    sox = abs(shadowOffsets[0]), soy = abs(shadowOffsets[1]), shadowcv, shadowc;
  padding = max(padding, sox + shadowBlur, soy + shadowBlur);
  x1 = 2 * (padding + bgOutlineThickness);
  y1 = 2 *（填充+ bgOutlineThickness）;
  cw = this.width + x1;
  ch = this.height + y1;
  offx = offy = padding + bgOutlineThickness;

  if（this.image）{
    ix = iy = padding + bgOutlineThickness;
    iw = this.iwidth;
    ih = this.iheight;
    if（this.ipos =='top'|| this.ipos =='bottom'）{
      if（iw <this.width）
        ix + = this.Align（iw，this.width，this.ialign）;
      其他
        offx + = this.Align（this.width，iw，this.align）;
      if（this.ipos =='top'）
        offy + = ih + this.ipad;
      其他
        iy + = this.height + this.ipad;
      cw = max（cw，iw + x1）;
      ch + = ih + this.ipad;
    } else {
      if（ih <this.height）
        iy + = this.Align（呃，this.height，this.ivalign）;
      其他
        offy + = this.Align（this.height，ih，this.valign）;
      if（this.ipos =='right'）
        ix += this.width + this.ipad;
      else
        offx += iw + this.ipad;
      cw += iw + this.ipad;
      ch = max(ch, ih + y1);
    }
  }

  cv = NewCanvas(cw, ch);
  if(!cv)
    return null;
  x1 = y1 = bgOutlineThickness / 2;
  x2 = cw - bgOutlineThickness;
  y2 = ch - bgOutlineThickness;
  rr = min(radius, x2 / 2, y2 / 2);
  c = cv.getContext('2d');
  if(bgColour) {
    c.fillStyle = bgColour;
    RRect(c, x1, y1, x2, y2, rr);
  }
  if(bgOutlineThickness) {
    c.strokeStyle = bgOutline;
    c.lineWidth = bgOutlineThickness;
    RRect(c, x1, y1, x2, y2, rr, true);
  }
  if(shadowBlur || sox || soy) {
    // use a transparent canvas to draw on
    shadowcv = NewCanvas(cw, ch);
    if(shadowcv) {
      shadowc = c;
      c = shadowcv.getContext('2d');
    }
  }

  // don't use TextSet shadow support because it adds space for shadow
  TextSet（c，this.font，color，this.strings，offx，offy，0,0，[]，
    this.maxWidth，this.stringWidths，this.align）;

  如果（this.image）
    c.drawImage（this.image，ix，iy，iw，ih）;

  if（shadowc）{
    //使用添加的阴影绘制文本和图像
    c = shadowc;
    shadowColour &&（c.shadowColor = shadowColour）;
    shadowBlur &&（c.shadowBlur = shadowBlur）;
    c.shadowOffsetX = shadowOffsets [0];
    c.shadowOffsetY = shadowOffsets [1];
    c.drawImage（shadowcv，0,0）;
  }
  返回简历;
};
function ExpandImage（i，w，h）{
  var cv = NewCanvas（w，h），c;
  如果（！CV）
    return null;
  c = cv.getContext（'2d'）;
  c.drawImage（i，（w  -  i.width）/ 2，（h  -  i.height）/ 2）;
  返回简历;
}
function ScaleImage（i，w，h）{
  var cv = NewCanvas（w，h），c;
  如果（！CV）
    return null;
  c = cv.getContext（'2d'）;
  c.drawImage（i，0,0，w，h）;
  返回简历;
}
函数AddBackgroundToImage（i，w，h，scale，color，othickness，ocolour，
  padding，radius，ofill）{
  var cw = w +（（2 * padding）+ othickness）* scale，
    ch = h +（（2 * padding）+ othickness）* scale，
    cv = NewCanvas（cw，ch），c，x1，y1，x2，y2，ocanvas，cc，rr;
  如果（！CV）
    return null;
  othickness * = scale;
  半径* =比例;
  x1 = y1 = othickness / 2;
  x2 = cw  -  othickness;
  y2 = ch  -  othickness;
  padding =（padding * scale）+ x1; //为大纲添加空间
  c = cv.getContext（'2d'）;
  rr = min（半径，x2 / 2，y2 / 2）;
  if（color）{
    c.fillStyle = color;
    RRect（c，x1，y1，x2，y2，rr）;
  }
  if（othickness）{
    c.strokeStyle = ocolour;
    c.lineWidth = othickness;
    RRect（c，x1，y1，x2，y2，rr，true）;
  }

  if（ofill）{
    //使用合成在图像和边框中着色
    ocanvas = NewCanvas（cw，ch）;
    cc = ocanvas.getContext（'2d'）;
    cc.drawImage(i, padding, padding, w, h);
    cc.globalCompositeOperation = 'source-in';
    cc.fillStyle = ocolour;
    cc.fillRect(0, 0, cw, ch);
    cc.globalCompositeOperation = 'destination-over';
    cc.drawImage(cv, 0, 0);
    cc.globalCompositeOperation = 'source-over';
    c.drawImage(ocanvas, 0, 0);
  } else {
    c.drawImage(i, padding, padding, i.width, i.height);
  }
  return {image: cv, width: cw / scale, height: ch / scale};
}
/**
 * Rounds off the corners of an image
 */
function RoundImage(i, r, iw, ih, s) {
  var cv, c, r1 = parseFloat(r), l = max(iw, ih);
  cv = NewCanvas(iw, ih);
  if(!cv)
    return null;
  if(r.indexOf('%') > 0)
    r1 = l * r1 / 100;
  else
    r1 = r1 * s;
  c = cv.getContext('2d');
  c.globalCompositeOperation = 'source-over';
  c.fillStyle ='＃fff';
  if（r1> = l / 2）{
    r1 = min（iw，ih）/ 2;
    c.beginPath（）;
    c.moveTo（IW / 2，1H / 2）;
    c.arc（IW / 2，1H / 2，r1,0,2 * Math.PI，FALSE）;
    c.fill（）;
    c.closePath（）;
  } else {
    r1 = min（iw / 2，ih / 2，r1）;
    RRect（c，0,0，iw，ih，r1，true）;
    c.fill（）;
  }
  c.globalCompositeOperation ='source-in';
  c.drawImage（i，0,0，iw，ih）;
  返回简历;
}
/ **
 *创建一个包含图像及其阴影的新画布
 *返回包含图像的对象及其在z = 0处的尺寸
 * /
函数AddShadowToImage（i，w，h，scale，sc，sb，so）{
  var sw = abs（so [0]），sh = abs（so [1]），
    cw = w +（sw> sb？sw + sb：sb * 2）* scale，
    ch = h +（sh> sb？sh + sb：sb * 2）* scale，
    xo = scale *（（sb || 0）+（so [0] <0？sw：0）），
    yo = scale *（（sb || 0）+（so [1] <0？sh：0）），cv，c;
  cv = NewCanvas（cw，ch）;
  如果（！CV）
    return null;
  c = cv.getContext（'2d'）;
  sc &&（c.shadowColor = sc）;
  sb &&（c.shadowBlur = sb * scale）;
  所以&&（c.shadowOffsetX = so [0] * scale，c.shadowOffsetY = so [1] * scale）;
  c.drawImage（i，xo，yo，w，h）;
  return {image：cv，width：cw / scale，height：ch / scale};
}
function FindTextBoundingBox（s，f，ht）{
  var w = parseInt（s.toString（）。length * ht），h = parseInt（ht * 2 * s.length），
    cv = NewCanvas（w，h），c，idata，w1，h1，x，y，i，ex;
  如果（！CV）
    return null;
  c = cv.getContext（'2d'）;
  c.fillStyle ='＃000';
  c.fillRect（0,0，W，H）;
  TextSet(c,ht + 'px ' + f,'#fff',s,0,0,0,0,[],'centre')

  idata = c.getImageData(0,0,w,h);
  w1 = idata.width; h1 = idata.height;
  ex = {
    min: { x: w1, y: h1 },
    max: { x: -1, y: -1 }
  };
  for(y = 0; y < h1; ++y) {
    for(x = 0; x < w1; ++x) {
      i = (y * w1 + x) * 4;
      if(idata.data[i+1] > 0) {
        if(x < ex.min.x) ex.min.x = x;
        if(x > ex.max.x) ex.max.x = x;
        if(y < ex.min.y) ex.min.y = y;
        if(y > ex.max.y) ex.max.y = y;
      }
    }
  }
  // device pixels might not be css pixels
  if(w1 != w) {
    ex.min.x *= (w / w1);
    ex.max.x *= (w / w1);
  }
  if(h1 != h) {
    ex.min.y *= (w / h1);
    ex.max.y *= (w / h1);
  }

  cv = null;
  return ex;
}
function FixFont(f) {
  return“'”+ f.replace（/（\'| \“）/ g，''）。replace（/ \ s *，\ s * / g，”'，'“）+”'“;
}
function AddHandler（h，f，e）{
  e = e || 文档;
  如果（e.addEventListener）
    e.addEventListener（H，F，假）;
  其他
    e.attachEvent（'on'+ h，f）;
}
function RemoveHandler（h，f，e）{
  e = e || 文档;
  如果（e.removeEventListener）
    e.removeEventListener（h，f）;
  其他
    e.detachEvent（'on'+ h，f）;
}
函数AddImage（i，o，t，tc）{
  var s = tc.imageScale，mscale，ic，bc，oc，iw，ih;
  //图像未加载，等待图像上传
  如果（！o.complete）
    return AddHandler（'load'，function（）{AddImage（i，o，t，tc）;}，o）;
  如果（！i.complete）
    return AddHandler（'load'，function（）{AddImage（i，o，t，tc）;}，i）;

  //是的，这确实看起来像废话，但它确保了两者
  //宽度和高度实际上是设置的，而不仅仅是计算。这是
  //隐藏图像时需要保持比例尺寸，所以
  //图像可以再次用于另一个云。
  o.width = o.width;
  o.height = o.height;

  if（s）{
    i.width = o.width * s;
    i.height = o.height * s;
  }
  // the standard width of the image, with imageScale applied
  t.iw = i.width;
  t.ih = i.height;
  if(tc.txtOpt) {
    ic = i;
    mscale = tc.zoomMax * tc.txtScale;
    iw = t.iw * mscale;
    ih = t.ih * mscale;
    if(iw < o.naturalWidth || ih < o.naturalHeight) {
      ic = ScaleImage(i, iw, ih);
      if(ic)
        t.fimage = ic;
    } else {
      iw = t.iw;
      ih = t.ih;
      mscale = 1;
    }
    if(parseFloat(tc.imageRadius))
      t.image = t.fimage = i = RoundImage(t.image, tc.imageRadius, iw, ih, mscale);
    if（！t.HasText（））{
      if（tc.shadow）{
        ic = AddShadowToImage（t.image，iw，ih，mscale，tc.shadow，tc.shadowBlur，
          tc.shadowOffset）;
        if（ic）{
          t.fimage = ic.image;
          tw = ic.width;
          th = ic.height;
        }
      }
      if（tc.bgColour || tc.bgOutlineThickness）{
        bc = tc.bgColour =='tag'？GetProperty（ta，'background-color'）：
          tc.bgColour;
        oc = tc.bgOutline =='tag'？GetProperty（ta，'color'）：
          （tc.bgOutline || tc.textColour）;
        iw = t.fimage.width;
        ih = t.fimage.height;
        if（tc.outlineMethod =='color'）{
          //首先使用当前图像状态创建大纲版本
          ic = AddBackgroundToImage（t.fimage，iw，ih，mscale，bc，
            tc.bgOutlineThickness，t.outline.colour，tc.padding，tc.bgRadius，1）;
          如果（IC）
            t.oimage = ic.image;
        }
        ic = AddBackgroundToImage（t.fimage，iw，ih，mscale，bc，
          tc.bgOutlineThickness，oc，tc.padding，tc.bgRadius）;
        if（ic）{
          t.fimage = ic.image;
          tw = ic.width;
          th = ic.height;
        }
      }
      if（tc.outlineMethod =='size'）{
        if（tc.outlineIncrease> 0）{
          t.iw + = 2 * tc.outlineIncrease;
          t.ih + = 2 * tc.outlineIncrease;
          iw = mscale * t.iw;
          ih = mscale * t.ih;
          ic = ScaleImage（t.fimage，iw，ih）;
          t.oimage = ic;
          t.fimage = ExpandImage（t.fimage，t.oimage.width，t.oimage.height）;
        } else {
          iw = mscale *（t.iw +（2 * tc.outlineIncrease））;
          ih = mscale *（t.ih +（2 * tc.outlineIncrease））;
          ic = ScaleImage（t.fimage，iw，ih）;
          t.oimage = ExpandImage（ic，t.fimage.width，t.fimage.height）;
        }
      }
    }
  }
  t.Init（）;
}
function GetProperty（e，p）{
  var dv = doc.defaultView，pc = p.replace（/ \  - （[az]）/ g，function（a）{return a.charAt（1）.toUpperCase（）}）;
  return (dv && dv.getComputedStyle && dv.getComputedStyle(e,null).getPropertyValue(p)) ||
    (e.currentStyle && e.currentStyle[pc]);
}
function FindWeight(a, wFrom, tHeight) {
  var w = 1, p;
  if(wFrom) {
    w = 1 * (a.getAttribute(wFrom) || tHeight);
  } else if(p = GetProperty(a,'font-size')) {
    w = (p.indexOf('px') > -1 && p.replace('px','') * 1) ||
      (p.indexOf('pt') > -1 && p.replace('pt','') * 1.25) ||
      p * 3.3;
  }
  return w;
}
function EventToCanvasId(e) {
  return e.target && Defined(e.target.id) ? e.target.id :
    e.srcElement.parentNode.id;
}
function EventXY(e, c) {
  var xy, p, xmul = parseInt(GetProperty(c, 'width')) / c.width,
    ymul = parseInt(GetProperty(c, 'height')) / c.height;
  if（已定义（e.offsetX））{
    xy = {x：e.offsetX，y：e.offsetY};
  } else {
    p = AbsPos（c.id）;
    如果（定义（e.changedTouches））
      e = e.changedTouches [0];
    如果（e.pageX）
      xy = {x：e.pageX  -  px，y：e.pageY  -  py};
  }
  if（xy && xmul && ymul）{
    xy.x / = xmul;
    xy.y / = ymul;
  }
  返回xy;
}
function MouseOut（e）{
  var cv = e.target || e.fromElement.parentNode，tc = TagCanvas.tc [cv.id];
  if（tc）{
   tc.mx = tc.my = -1;
   tc.UnFreeze（）;
   tc.EndDrag（）;
  }
}
function MouseMove（e）{
  var i，t = TagCanvas，tc，p，tg = EventToCanvasId（e）;
  for（i in t.tc）{
    tc = t.tc [i];
    if（tc.tttimer）{
      clearTimeout（tc.tttimer）;
      tc.tttimer = null;
    }
  }
  if（tg && t.tc [tg]）{
    tc = t.tc [tg];
    if（p = EventXY（e，tc.canvas））{
      tc.mx = px;
      tc.my = py;
      tc.Drag（e，p）;
    }
    tc.drawn = 0;
  }
}
function MouseDown（e）{
  var t = TagCanvas，cb = doc.addEventListener？0：1，
    tg = EventToCanvasId（e）;
  if（tg && e.button == cb && t.tc [tg]）{
    t.tc [TG] .BeginDrag（E）;
  }
}
function MouseUp（e）{
  var t = TagCanvas，cb = doc.addEventListener？0：1，
    tg = EventToCanvasId（e），tc;
  if（tg && e.button == cb && t.tc [tg]）{
    tc = t.tc [tg];
    的MouseMove（E）;
    if（！tc.EndDrag（）&&！tc.touchState）
      tc.Clicked（E）;
  }
}
功能TouchDown（e）{
  var tg = EventToCanvasId（e），tc =（tg && TagCanvas.tc [tg]），p;
  if（tc && e.changedTouches）{
    if（e.touches.length == 1 && tc.touchState == 0）{
      tc.touchState = 1;
      tc.BeginDrag（E）;
      if（p = EventXY（e，tc.canvas））{
        tc.mx = px;
        tc.my = py;
        tc.drawn = 0;
      }
    } else if（e.targetTouches.length == 2 && tc.pinchZoom）{
      tc.touchState = 3;
      tc.EndDrag（）;
      tc.BeginPinch（E）;
    } else {
      tc.EndDrag（）;
      tc.EndPinch（）;
      tc.touchState = 0;
    }
  }
}
功能TouchUp（e）{
  var tg = EventToCanvasId（e），tc =（tg && TagCanvas.tc [tg]）;
  if（tc && e.changedTouches）{
    switch（tc.touchState）{
    情况1：
      tc.Draw（）;
      tc.Clicked（）;
      打破;
    案例2：
      tc.EndDrag（）;
      打破;
    案例3：
      tc.EndPinch（）;
    }
    tc.touchState = 0;
  }
}
功能TouchMove（e）{
  var i，t = TagCanvas，tc，p，tg = EventToCanvasId（e）;
  for（i in t.tc）{
    tc = t.tc [i];
    if（tc.tttimer）{
      clearTimeout（tc.tttimer）;
      tc.tttimer = null;
    }
  }
  tc =（tg && t.tc [tg]）;
  if（tc && e.changedTouches && tc.touchState）{
    switch（tc.touchState）{
    情况1：
    案例2：
      if（p = EventXY（e，tc.canvas））{
        tc.mx = px;
        tc.my = py;
        if（tc.Drag（e，p））
          tc.touchState = 2;
      }
      打破;
    案例3：
      tc.Pinch（E）;
    }
    tc.drawn = 0;
  }
}
function MouseWheel（e）{
  var t = TagCanvas，tg = EventToCanvasId（e）;
  if（tg && t.tc [tg]）{
    e.cancelBubble = true;
    e.returnValue = false;
    e.preventDefault && e.preventDefault（）;
    t.tc [tg] .Wheel（（e.wheelDelta || e.detail）> 0）;
  }
}
功能滚动（e）{
  var i，t = TagCanvas;
  clearTimeout（t.scrollTimer）;
  for（i in t.tc）{
    t.tc [I] .Pause（）;
  }
  t.scrollTimer = setTimeout（function（）{
    var i，t = TagCanvas;
    for（i in t.tc）{
      t.tc [I] .Resume（）;
    }
  }，t.scrollPause）;
}
function DrawCanvas（）{
  DrawCanvasRAF（TimeNow（））;
}
函数DrawCanvasRAF（t）{
  var tc = TagCanvas.tc，i;
  TagCanvas.NextFrame（TagCanvas.interval）;
  t = t || 现在的时间（）;
  for（i in tc）
    TC [I] .Draw（T）;
}
function AbsPos（id）{
  var e = doc.getElementById（id），r = e.getBoundingClientRect（），
    dd = doc.documentElement，b = doc.body，w = window，
    xs = w.pageXOffset || dd.scrollLeft，
    ys = w.pageYOffset || dd.scrollTop，
    xo = dd.clientLeft || b.clientLeft，
    yo = dd.clientTop || b.clientTop;
  return {x：r.left + xs  -  xo，y：r.top + ys  -  yo};
}
function Project（tc，p1，sx，sy）{
  var m = tc.radius * tc.z1 /（tc.z1 + tc.z2 + p1.z）;
  返回{
    x：p1.x * m * sx，
    y：p1.y * m * sy，
    z：p1.z，
    w：（tc.z1  -  p1.z）/ tc.z2
  };
}
/ **
 * @constructor
 * for recursively splitting tag contents on <br> tags
 */
function TextSplitter(e) {
  this.e = e;
  this.br = 0;
  this.line = [];
  this.text = [];
  this.original = e.innerText || e.textContent;
}
TSproto = TextSplitter.prototype;
TSproto.Empty = function() {
  for(var i = 0; i < this.text.length; ++i)
    if(this.text[i].length)
      return false;
  return true;
};
TSproto.Lines = function(e) {
  var r = e？1：0，cn，cl，i;
  e = e || this.e;
  cn = e.childNodes;
  cl = cn.length;

  for（i = 0; i <cl; ++ i）{
    if（cn [i] .nodeName =='BR'）{
      this.text.push（this.line.join（''））;
      this.br = 1;
    } else if（cn [i] .nodeType == 3）{
      if（this.br）{
        this.line = [cn [i] .nodeValue];
        this.br = 0;
      } else {
        this.line.push（CN [I] .nodeValue）;
      }
    } else {
      this.Lines（CN [I]）;
    }
  }
  r || this.br || this.text.push（this.line.join（''））;
  return this.text;
};
TSproto.SplitWidth = function（w，c，f，h）{
  var i，j，words，text = [];
  c.font = h +'px'+ f;
  for（i = 0; i <this.text.length; ++ i）{
    words = this.text [i] .split（/ \ s + /）;
    this.line = [words [0]];
    for（j = 1; j <words.length; ++ j）{
      if(c.measureText(this.line.join(' ') + ' ' + words[j]).width > w) {
        text.push(this.line.join(' '));
        this.line = [words[j]];
      } else {
        this.line.push(words[j]);
      }
    }
    text.push(this.line.join(' '));
  }
  return this.text = text;
};
/**
 * @constructor
 */
function Outline(tc,t) {
  this.ts = null;
  this.tc = tc;
  this.tag = t;
  this.x = this.y = this.w = this.h = this.sc = 1;
  this.z = 0;
  this.pulse = 1;
  this.pulsate = tc.pulsateTo <1;
  this.colour = tc.outlineColour;
  this.adash = ~~ tc.outlineDash;
  this.agap = ~~ tc.outlineDashSpace || this.adash;
  this.aspeed = tc.outlineDashSpeed * 1;
  if（this.colour =='tag'）
    this.colour = GetProperty（ta，'color'）;
  否则如果（this.colour =='tagbg'）
    this.colour = GetProperty（ta，'background-color'）;
  this.Draw = this.pulsate？this.DrawPulsate：this.DrawSimple;
  this.radius = tc.outlineRadius | 0;
  this.SetMethod（tc.outlineMethod）;
}
Oproto = Outline.prototype;
Oproto.SetMethod = function（om）{
  var methods = {
    block：['PreDraw'，'DrawBlock']，
    color：['PreDraw'，'DrawColour']，
    outline：['PostDraw'，'DrawOutline']，
    经典：['LastDraw'，'DrawOutline']，
    size：['PreDraw'，'DrawSize']，
    none：['LastDraw']
  }，funcs = methods [om] || methods.outline;
  if（om =='none'）{
    this.Draw = function（）{return 1; }
  } else {
    this.drawFunc = this [funcs [1]];
  }
  这[funcs [0]] = this.Draw;
};
Oproto.Update = function（x，y，w，h，sc，z，xo，yo）{
  var o = this.tc.outlineOffset，o2 = 2 * o;
  this.x = sc * x + xo  -  o;
  this.y = sc * y + yo  -  o;
  this.w = sc * w + o2;
  this.h = sc * h + o2;
  this.sc = sc; //用来确定最前面的
  this.z = z;
};
Oproto.Ants = function（c）{
  如果（！this.adash）
    返回;
  var l = this.adash，g = this.agap，s = this.aspeed，length = l + g，
    l1 = 0，l2 = 1，g1 = g，g2 = 0，seq = 0，蚂蚁;
  if（s）{
    seq = abs（s）*（TimeNow（） -  this.ts）/ 50;
    if（s <0）
      seq = 8.64e6  -  seq;
    s = ~~ seq％length;
  }
  if（s）{
    if（l> = s）{
      l1 = l  -  s;
      l2 = s;
    } else {
      g1 =长度 -  s;
      g2 = g  -  g1;
    }
    蚂蚁= [l1，g1，l2，g2];
  } else {
    蚂蚁= [l，g];
  }
  c.setLineDash（蚂蚁）;
}
Oproto.DrawOutline = function（c，x，y，w，h，color）{
  var r = min（this.radius，h / 2，w / 2）;
  c.strokeStyle = color;
  this.Ants（C）;
  RRect（c，x，y，w，h，r，true）;
};
Oproto.DrawSize = function（c，x，y，w，h，color，tag，x1，y1）{
  var tw = tag.w，th = tag.h，m，i，sc;
  if（this.pulsate）{
    如果（tag.image）
      sc =（tag.image.height + this.tc.outlineIncrease）/ tag.image.height;
    其他
      sc = tag.oscale;
    i = tag.fimage || tag.image;
    m = 1 +（（sc-1）*（1-this.pulse））;
    tag.h * = m;
    tag.w * = m;
  } else {
    i = tag.oimage;
  }
  tag.alpha = 1;
  tag.Draw（c，x1，y1，i）;
  tag.h = th;
  tag.w = tw;
  返回1;
};
Oproto.DrawColour = function（c，x，y，w，h，color，tag，x1，y1）{
  if(tag.oimage) {
    if(this.pulse < 1) {
      tag.alpha = 1 - pow(this.pulse, 2);
      tag.Draw(c, x1, y1, tag.fimage);
      tag.alpha = this.pulse;
    } else {
      tag.alpha = 1;
    }
    tag.Draw(c, x1, y1, tag.oimage);
    return 1;
  }
  返回这个[tag.image？'DrawColourImage'：'DrawColourText']（c，x，y，w，h，color，tag，x1，y1）;
};
Oproto.DrawColourText = function（c，x，y，w，h，color，tag，x1，y1）{
  var normal = tag.colour;
  tag.colour = color;
  tag.alpha = 1;
  tag.Draw（C，X1，Y1）;
  tag.colour = normal;
  返回1;
};
Oproto.DrawColourImage = function（c，x，y，w，h，color，tag，x1，y1）{
  var ccanvas = c.canvas，fx = ~~ max（x，0），fy = ~~ max（y，0），
    fw = min（ccanvas.width  -  fx，w）+ .5 | 0，fh = min（ccanvas.height  -  fy，h）+ .5 | 0，cc;
  如果（ocanvas）
    ocanvas.width = fw，ocanvas.height = fh;
  其他
    ocanvas = NewCanvas（fw，fh）;
  如果（！ocanvas）
    返回this.SetMethod（'outline'）; //如果使用IE和图像，放弃！
  cc = ocanvas.getContext（'2d'）;

  cc.drawImage（ccanvas，FX，FY，FW，FH，0,0，FW，FH）;
  c.clearRect（FX，FY，FW，FH）;
  if（this.pulsate）{
    tag.alpha = 1  -  pow（this.pulse，2）;
  } else {
    tag.alpha = 1;
  }
  tag.Draw（C，X1，Y1）;
  c.setTransform（1,0,0,1,0,0）;
  c.save（）;
  c.beginPath（）;
  c.rect（FX，FY，FW，FH）;
  c.clip（）;
  c.globalCompositeOperation ='source-in';
  c.fillStyle = color;
  c.fillRect（FX，FY，FW，FH）;
  c.restore（）;
  c.globalAlpha = 1;
  c.globalCompositeOperation ='destination-over';
  c.drawImage（ocanvas，0,0，FW，FH，FX，FY，FW，FH）;
  c.globalCompositeOperation ='source-over';
  返回1;
};
Oproto.DrawBlock = function（c，x，y，w，h，color）{
  var r = min（this.radius，h / 2，w / 2）;
  c.fillStyle = color;
  RRect（c，x，y，w，h，r）;
};
Oproto.DrawSimple = function（c，tag，x1，y1，ga，useGa）{
  var t = this.tc;
  c.setTransform（1,0,0,1,0,0）;
  c.strokeStyle = this.colour;
  c.lineWidth = t.outlineThickness;
  c.shadowBlur = c.shadowOffsetX = c.shadowOffsetY = 0;
  c.globalAlpha = useGa？ga：1;
  return this.drawFunc（c，this.x，this.y，this.w，this.h，this.colour，tag，x1，y1）;
};
Oproto.DrawPulsate = function（c，tag，x1，y1）{
  var diff = TimeNow（） -  this.ts，t = this.tc，
    ga = t.pulsateTo +（（1-t.pulsateTo）*
    （0.5 +（cos（2 * Math.PI * diff /（1000 * t.pulsateTime））/ 2）））;
  this.pulse = ga = TagCanvas.Smooth（1，ga）;
  返回this.DrawSimple（c，tag，x1，y1，ga，1）;
};
Oproto.Active = function（c，x，y）{
  var a =（x> = this.x && y> = this.y &&
    x <= this.x + this.w && y <= this.y + this.h）;
  如果一个） {
    this.ts = this.ts || TimeNow();
  } else {
    this.ts = null;
  }
  return a;
};
Oproto.PreDraw = Oproto.PostDraw = Oproto.LastDraw = Nop;
/**
 * @constructor
 */
function Tag(tc, text, a, v, w, h, col, bcol, bradius, boutline, bothickness,
  font, padding, original) {
  this.tc = tc;
  this.image = null;
  this.text = text;
  this.text_original = original;
  this.line_widths = [];
  this.title = a.title || null;
  this.a = a;
  this.position = new Vector(v[0], v[1], v[2]);
  this.x = this.y = this.z = 0;
  this.w = w;
  this.h = h;
  this.colour = col || tc.textColour;
  this.bgColour = bcol || tc.bgColour;
  this.bgRadius = bradius | 0;
  this.bgOutline = boutline || this.colour;
  this.bgOutlineThickness = bothickness | 0;
  this.textFont = font || tc.textFont;
  this.padding = padding | 0;
  this.sc = this.alpha = 1;
  this.weighted = !tc.weight;
  this.outline = new Outline(tc,this);
}
Tproto = Tag.prototype;
Tproto.Init = function(e) {
  var tc = this.tc;
  this.textHeight = tc.textHeight;
  if(this.HasText()) {
    this.Measure(tc.ctxt,tc);
  } else {
    this.w = this.iw;
    this.h = this.ih;
  }

  this.SetShadowColour = tc.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
  this.SetDraw(tc);
};
Tproto.Draw = Nop;
Tproto.HasText = function() {
  return this.text && this.text[0].length > 0;
};
Tproto.EqualTo = function(e) {
  var i = e.getElementsByTagName('img');
  if(this.a.href != e.href)
    return 0;
  if(i.length)
    return this.image.src == i[0].src;
  return (e.innerText || e.textContent) == this.text_original;
};
Tproto.SetImage = function(i) {
  this.image = this.fimage = i;
};
Tproto.SetDraw = function(t) {
  this.Draw = this.fimage ? (t.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
  t.noSelect && (this.CheckActive = Nop);
};
Tproto.MeasureText = function(c) {
  var i, l = this.text.length, w = 0, wl;
  for(i = 0; i < l; ++i) {
    this.line_widths [i] = wl = c.measureText（this.text [i]）。width;
    w = max（w，wl）;
  }
  返回w;
};
Tproto.Measure = function（c，t）{
  var extents = FindTextBoundingBox（this.text，this.textFont，this.textHeight），
    s，th，f，soff，cw，twidth，theight，img，tcv;
  //在顶部添加间隙到高度，使底部的间隙相等
  theight =范围？extents.max.y + extents.min.y：this.textHeight;
  c.font = this.font = this.textHeight +'px'+ this.textFont;
  twidth = this.MeasureText（c）;
  if（t.txtOpt）{
    s = t.txtScale;
    th = s * this.textHeight;
    f = th +'px'+ this.textFont;
    soff = [s * t.shadowOffset [0]，s * t.shadowOffset [1]];
    c.font = f;
    cw = this.MeasureText（c）;
    tcv = new TextCanvas（this.text，f，cw + s，（s * theight）+ s，cw，
      this.line_widths，t.textAlign，t.textVAlign，s）;

    如果（this.image）
      tcv.SetImage（this.image，this.iw，this.ih，t.imagePosition，t.imagePadding，
        t.imageAlign，t.imageVAlign，t.imageScale）;

    img = tcv.Create（this.colour，this.bgColour，this.bgOutline，
      s * this.bgOutlineThickness，t.shadow，s * t.shadowBlur，soff，
      s * this.padding，s * this.bgRadius）;

    //使用高亮颜色添加轮廓图像
    if（t.outlineMethod =='color'）{
      this.oimage = tcv.Create（this.outline.colour，this.bgColour，this.outline.colour，
        s * this.bgOutlineThickness，t.shadow，s * t.shadowBlur，soff，
        s * this.padding，s * this.bgRadius）;

    } else if（t.outlineMethod =='size'）{
      extents = FindTextBoundingBox（this.text，this.textFont，
        this.textHeight + t.outlineIncrease）;
      th = extents.max.y + extents.min.y;
      f =（s *（this.textHeight + t.outlineIncrease））+'px'+ this.textFont;
      c.font = f;
      cw = this.MeasureText（c）;

      tcv = new TextCanvas（this.text，f，cw + s，（s * th）+ s，cw，
        this.line_widths，t.textAlign，t.textVAlign，s）;
      如果（this.image）
        tcv.SetImage（this.image，this.iw + t.outlineIncrease，
          this.ih + t.outlineIncrease，t.imagePosition，t.imagePadding，
          t.imageAlign，t.imageVAlign，t.imageScale）;

      this.oimage = tcv.Create（this.colour，this.bgColour，this.bgOutline，
        s * this.bgOutlineThickness, t.shadow, s * t.shadowBlur, soff,
        s * this.padding, s * this.bgRadius);

      this.oscale = this.oimage.width / img.width;
      if(t.outlineIncrease > 0)
        img = ExpandImage(img, this.oimage.width, this.oimage.height);
      else
        this.oimage = ExpandImage(this.oimage, img.width, img.height);
    }
    if(img) {
      this.fimage = img;
      twidth = this.fimage.width / s;
      theight = this.fimage.height / s;
    }
    this.SetDraw(t);
    t.txtOpt = !!this.fimage;
  }
  this.h = theight;
  this.w = twidth;
};
Tproto.SetFont = function(f, c, bc, boc) {
  this.textFont = f;
  this.colour = c;
  this.bgColour = bc;
  this.bgOutline = boc;
  this.Measure(this.tc.ctxt, this.tc);
};
Tproto.SetWeight = function(w) {
  var tc = this.tc, modes = tc.weightMode.split(/[, ]/), m, s, wl = w.length;
  if(!this.HasText())
    return;
  this.weighted = true;
  for(s = 0; s < wl; ++s) {
    m = modes[s] || 'size';
    if('both' == m) {
      this.Weight(w[s], tc.ctxt, tc, 'size', tc.min_weight[s],
        tc.max_weight[s], s);
      this.Weight（w [s]，tc.ctxt，tc，'color'，tc.min_weight [s]，
        tc.max_weight [s]，s）;
    } else {
      this.Weight（w [s]，tc.ctxt，tc，m，tc.min_weight [s]，tc.max_weight [s]，s）;
    }
  }
  this.Measure（tc.ctxt，tc）;
};
Tproto.Weight = function（w，c，t，m，wmin，wmax，wnum）{
  w = isNaN（w）？1：w;
  var nweight =（w  -  wmin）/（wmax  -  wmin）;
  if（'color'== m）
    this.colour = FindGradientColour（t，nweight，wnum）;
  否则如果（'bgcolour'== m）
    this.bgColour = FindGradientColour（t，nweight，wnum）;
  否则if（'bgoutline'== m）
    this.bgOutline = FindGradientColour（t，nweight，wnum）;
  否则如果（'outline'== m）
    this.outline.colour = FindGradientColour（t，nweight，wnum）;
  否则if（'size'== m）{
    if（t.weightSizeMin> 0 && t.weightSizeMax> t.weightSizeMin）{
      this.textHeight = t.weightSize *
        （t.weightSizeMin +（t.weightSizeMax  -  t.weightSizeMin）* nweight）;
    } else {
      // min textHeight of 1
      this.textHeight = max（1，w * t.weightSize）;
    }
  }
};
Tproto.SetShadowColourFixed = function（c，s，a）{
  c.shadowColor = s;
};
Tproto.SetShadowColourAlpha = function（c，s，a）{
  c.shadowColor = SetAlpha（s，a）;
};
Tproto.DrawText = function（c，xoff，yoff）{
  var t = this.tc，x = this.x，y = this.y，s = this.sc，i，xl;
  c.globalAlpha = this.alpha;
  c.fillStyle = this.colour;
  t.shadow && this.SetShadowColour（c，t.shadow，this.alpha）;
  c.font = this.font;
  x + = xoff / s;
  y + =（yoff / s） - （this.h / 2）;
  for（i = 0; i <this.text.length; ++ i）{
    xl = x;
    if（'right'== t.textAlign）{
      xl + = this.w / 2  -  this.line_widths [i];
    } else if（'center'== t.textAlign）{
      xl  -  = this.line_widths [i] / 2;
    } else {
      xl  -  = this.w / 2;
    }
    c.setTransform（s，0,0，s，s * xl，s * y）;
    c.fillText（this.text [i]，0,0）;
    y + = this.textHeight;
  }
};
Tproto.DrawImage = function（c，xoff，yoff，im）{
  var x = this.x，y = this.y，s = this.sc，
    我= im || this.fimage，w = this.w，h = this.h，a = this.alpha，
    shadow = this.shadow;
  c.globalAlpha = a;
  shadow && this.SetShadowColour（c，shadow，a）;
  x + =（xoff / s） - （w / 2）;
  y + =（yoff / s） - （h / 2）;
  c.setTransform（s，0,0，s，s * x，s * y）;
  c.drawImage（i，0,0，w，h）;
};
Tproto.DrawImageIE = function（c，xoff，yoff）{
  var i = this.fimage，s = this.sc，
    w = i.width = this.w * s，h = i.height = this.h * s，
    x =（this.x * s）+ xoff  - （w / 2），y =（this.y * s）+ yoff  - （h / 2）;
  c.setTransform(1,0,0,1,0,0);
  c.globalAlpha = this.alpha;
  c.drawImage(i, x, y);
};
Tproto.Calc = function(m,a) {
  var pp, t = this.tc, mnb = t.minBrightness,
    mxb = t.maxBrightness, r = t.max_radius;
  pp = m.xform(this.position);
  this.xformed = pp;
  pp = Project(t, pp, t.stretchX, t.stretchY);
  this.x = pp.x;
  this.y = pp.y;
  this.z = pp.z;
  this.sc = pp.w;
  this.alpha = a * Clamp(mnb + (mxb - mnb) * (r - this.z) / (2 * r), 0, 1);
  return this.xformed;
};
Tproto.UpdateActive = function(c, xoff, yoff) {
  var o = this.outline, w = this.w, h = this.h,
    x = this.x - w/2, y = this.y - h/2;
  o.Update(x, y, w, h, this.sc, this.z, xoff, yoff);
  return o;
};
Tproto.CheckActive = function(c,xoff,yoff) {
  var t = this.tc, o = this.UpdateActive(c, xoff, yoff);
  return o.Active(c, t.mx, t.my) ? o : null;
};
Tproto.Clicked = function(e) {
  var a = this.a, t = a.target, h = a.href, evt;
  if(t != '' && t != '_self') {
    if(self.frames[t]) {
      self.frames[t].document.location = h;
    } else{
      try {
        if(top.frames[t]) {
          top.frames[t].document.location = h;
          return;
        }
      } catch(err) {
        // different domain/port/protocol?
      }
      window.open(h, t);
    }
    return;
  }
  if(doc.createEvent) {
    evt = doc.createEvent('MouseEvents');
    evt.initMouseEvent('click', 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
    if(!a.dispatchEvent(evt))
      return;
  } else if(a.fireEvent) {
    if(!a.fireEvent('onclick'))
      return;
  }
  doc.location = h;
};
/**
 * @constructor
 */
function TagCanvas(cid,lctr,opt) {
  var i, p, c = doc.getElementById(cid), cp = ['id','class','innerHTML'], raf;

  if(!c) throw 0;
  if(Defined(window.G_vmlCanvasManager)) {
    c = window.G_vmlCanvasManager.initElement(c);
    this.ie = parseFloat(navigator.appVersion.split('MSIE')[1]);
  }
  if(c && (!c.getContext || !c.getContext('2d').fillText)) {
    p = doc.createElement('DIV');
    for(i = 0; i < cp.length; ++i)
      p[cp[i]] = c[cp[i]];
    c.parentNode.insertBefore(p,c);
    c.parentNode.removeChild(c);
    throw 0;
  }
  for（我在TagCanvas.options中）
    这[i] = opt &&定义（opt [i]）？opt [i]：
      （已定义（TagCanvas [i]）？TagCanvas [i]：TagCanvas.options [i]）;

  this.canvas = c;
  this.ctxt = c.getContext（'2d'）;
  this.z1 = 250 / max（this.depth，0.001）;
  this.z2 = this.z1 / this.zoom;
  this.radius = min（c.height，c.width）* 0.0075; //在画布中适合半径100
  this.max_radius = 100;
  this.max_weight = [];
  this.min_weight = [];
  this.textFont = this.textFont && FixFont（this.textFont）;
  this.textHeight * = 1;
  this.imageRadius = this.imageRadius.toString（）;
  this.pulsateTo = Clamp（this.pulsateTo，0,1）;
  this.minBrightness = Clamp（this.minBrightness，0,1）;
  this.maxBrightness = Clamp（this.maxBrightness，this.minBrightness，1）;
  this.ctxt.textBaseline ='top';
  this.lx =（this.lock +''）。indexOf（'x'）+ 1;
  this.ly =（this.lock +''）。indexOf（'y'）+ 1;
  this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
  this.fixedAlpha = 1;
  this.source = lctr || CID;
  this.repeatTags = min（64，~~ this.repeatTags）;
  this.minTags = min（200，~~ this.minTags）;
  if（~~ this.scrollPause> 0）
    TagCanvas.scrollPause = ~~ this.scrollPause;
  其他
    this.scrollPause = 0;
  if（this.minTags> 0 && this.repeatTags <1 &&（i = this.GetTags（）。length））
    this.repeatTags = ceil（this.minTags / i） -  1;
  this.transform = Matrix.Identity（）;
  this.startTime = this.time = TimeNow（）;
  this.mx = this.my = -1;
  this.centreImage && CentreImage（this）;
  this.Animate = this.dragControl？this.AnimateDrag：this.AnimatePosition;
  this.animTiming =（typeof TagCanvas [this.animTiming] =='function'？
    TagCanvas [this.animTiming]：TagCanvas.Smooth）;
  if（this.shadowBlur || this.shadowOffset [0] || this.shadowOffset [1]）{
    //让浏览器将“red”翻译成“＃ff0000”
    this.ctxt.shadowColor = this.shadow;
    this.shadow = this.ctxt.shadowColor;
    this.shadowAlpha = ShadowAlphaBroken（）;
  } else {
    删除this.shadow;
  }
  this.Load（）;
  if（lctr && this.hideTags）{
    （function（t）{
    如果（TagCanvas.loaded）
      t.HideTags（）;
    其他
      AddHandler（'load'，function（）{t.HideTags（）;}，window）;
    }）（这个）;
  }

  this.yaw = this.initial？this.initial [0] * this.maxSpeed：0;
  this.pitch = this.initial？this.initial [1] * this.maxSpeed：0;
  if（this.tooltip）{
    this.ctitle = c.title;
    c.title ='';
    if（this.tooltip =='native'）{
      this.Tooltip = this.TooltipNative;
    } else {
      this.Tooltip = this.TooltipDiv;
      if（！this.ttdiv）{
        this.ttdiv = doc.createElement（'div'）;
        this.ttdiv.className = this.tooltipClass;
        this.ttdiv.style.position ='绝对';
        this.ttdiv.style.zIndex = c.style.zIndex + 1;
        的AddHandler（ '鼠标悬停'，函数（E）{e.target.style.display = '无';}，this.ttdiv）;
        doc.body.appendChild（this.ttdiv）;
      }
    }
  } else {
    this.Tooltip = this.TooltipNone;
  }
  if（！this.noMouse &&！handlers [cid]）{
    处理程序[cid] = [
      ['mousemove'，MouseMove]，
      ['mouseout'，MouseOut]，
      ['mouseup'，MouseUp]，
      ['touchstart'，TouchDown]，
      ['touchend'，TouchUp]，
      ['touchcancel'，TouchUp]，
      ['touchmove'，TouchMove]
    ]。
    if（this.dragControl）{
      处理程序[cid] .push（['mousedown'，MouseDown]）;
      handler [cid] .push（['selectstart'，Nop]）;
    }
    if（this.wheelZoom）{
      handlers [cid] .push（['mousewheel'，MouseWheel]）;
      处理程序[cid] .push（['DOMMouseScroll'，MouseWheel]）;
    }
    if（this.scrollPause）{
      处理程序[cid] .push（['scroll'，Scroll，window]）;
    }
    for（i = 0; i <handlers [cid] .length; ++ i）{
      p =处理程序[cid] [i];
      AddHandler（p [0]，p [1]，p [2]？p [2]：c）;
    }
  }
  if（！TagCanvas.started）{
    raf = window.requestAnimationFrame = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    TagCanvas.NextFrame = raf？TagCanvas.NextFrameRAF：
      TagCanvas.NextFrameTimeout;
    TagCanvas.interval = this.interval;
    TagCanvas.NextFrame（this.interval）;
    TagCanvas.started = 1;
  }
}
TCproto = TagCanvas.prototype;
TCproto.SourceElements = function（）{
  如果（doc.querySelectorAll）
    return doc.querySelectorAll（'＃'+ this.source）;
  return [doc.getElementById（this.source）];
};
TCproto.HideTags = function（）{
  var el = this.SourceElements（），i;
  for（i = 0; i <el.length; ++ i）
    el [i] .style.display ='none';
};
TCproto.GetTags = function（）{
  var el = this.SourceElements（），etl，tl = []，i，j，k;
  for（k = 0; k <= this.repeatTags; ++ k）{
    for（i = 0; i <el.length; ++ i）{
      etl = el [i] .getElementsByTagName（'a'）;
      for（j = 0; j <etl.length; ++ j）{
        tl.push（ETL [J]）;
      }
    }
  }
  返回tl;
};
TCproto.Message = function（text）{
  var tl = []，i，p，tc = text.split（''），a，t，x，z;
  for（i = 0; i <tc.length; ++ i）{
    if（tc [i]！=''）{
      p = i  -  tc.length / 2;
      a = doc.createElement（'A'）;
      a.href ='＃';
      a.innerText = tc[i];
      x = 100 * sin(p / 9);
      z = -100 * cos(p / 9);
      t = new Tag(this, tc[i], a, [x,0,z], 2, 18, '#000', '#fff', 0, 0, 0,
        'monospace', 2, tc[i]);
      t.Init();
      tl.push(t);
    }
  }
  return tl;
};
TCproto.CreateTag = function(e) {
  var im, i, t, txt, ts, font, bc, boc, p = [0, 0, 0];
  if('text' != this.imageMode) {
    im = e.getElementsByTagName('img');
    if(im.length) {
      i = new Image;
      i.src = im[0].src;

      if(!this.imageMode) {
        t = new Tag（this，“”，e，p，0,0）;
        t.SetImage（ⅰ）;
        //t.Init（）;
        AddImage（i，im [0]，t，this）;
        返回;
      }
    }
  }
  if（'image'！= this.imageMode）{
    ts = new TextSplitter（e）;
    txt = ts.Lines（）;
    if（！ts.Empty（））{
      font = this.textFont || FixFont（的getProperty（E， '字体家庭'））;
      如果（this.splitWidth）
        txt = ts.SplitWidth（this.splitWidth，this.ctxt，font，this.textHeight）;

      bc = this.bgColour =='tag'？GetProperty（e，'background-color'）：
        this.bgColour;
      boc = this.bgOutline =='tag'？GetProperty（e，'color'）：this.bgOutline;
    } else {
      ts = null;
    }
  }
  if（ts || i）{
    t =新标签（this，txt，e，p，2，this.textHeight + 2，
      this.textColour || GetProperty（e，'color'），bc，this.bgRadius，
      boc，this.bgOutlineThickness，font，this.padding，ts && ts.original）;
    如果我） {
      t.SetImage（ⅰ）;
      AddImage（i，im [0]，t，this）;
    } else {
      t.Init（）;
    }
    返回;
  }
};
TCproto.UpdateTag = function（t，a）{
  var color = this.textColour || GetProperty（a，'color'），
    font = this.textFont || FixFont（GetProperty（a，'font-family'）），
    bc = this.bgColour =='tag'？GetProperty（a，'background-color'）：
      this.bgColour，boc = this.bgOutline =='tag'？GetProperty（a，'color'）：
      this.bgOutline;
  ta = a;
  t.title = a.title;
  if（t.colour！= color || t.textFont！= font || t.bgColour！= bc ||
    t.bgOutline！= boc）
    t.SetFont（font，color，bc，boc）;
};
TCproto.Weight = function（tl）{
  var ll = tl.length，w，i，s，weights = []，有效，
    wfrom = this.weightFrom？this.weightFrom.split（/ [，] /）：[null]，
    wl = wfrom.length;
  for（i = 0; i <ll; ++ i）{
    weights [i] = [];
    for（s = 0; s <wl; ++ s）{
      w = FindWeight（tl [i] .a，wfrom [s]，this.textHeight）;
      if（！this.max_weight [s] || w> this.max_weight [s]）
        this.max_weight [s] = w;
      if（！this.min_weight [s] || w <this.min_weight [s]）
        this.min_weight [s] = w;
      权重[i] [s] = w;
    }
  }
  for（s = 0; s <wl; ++ s）{
    if（this.max_weight [s]> this.min_weight [s]）
      有效值= 1;
  }
  if（有效）{
    for（i = 0; i <ll; ++ i）{
      TL [I] .SetWeight（权重[I]）;
    }
  }
};
TCproto.Load = function（）{
  var tl = this.GetTags（），taglist = []，shape，t，
    shapeArgs，rx，ry，rz，vl，i，tagmap = []，pfuncs = {
      sphere：PointsOnSphere，
      vcylinder：PointsOnCylinderV，
      hcylinder：PointsOnCylinderH，
      vring：PointsOnRingV，
      hring：PointsOnRingH
    };

  if（tl.length）{
    tagmap.length = tl.length;
    for（i = 0; i <tl.length; ++ i）
      tagmap [i] = i;
    this.shuffleTags && Shuffle（tagmap）;
    rx = 100 * this.radiusX;
    ry = 100 * this.radiusY;
    rz = 100 * this.radiusZ;
    this.max_radius = max（rx，max（ry，rz））;

    for（i = 0; i <tl.length; ++ i）{
      t = this.CreateTag（tl [tagmap [i]]）;
      如果（t）的
        taglist.push（T）;
    }
    this.weight && this.Weight（taglist，true）;

    if（this.shapeArgs）{
      this.shapeArgs [0] = taglist.length;
    } else {
      shapeArgs = this.shape.toString（）。split（/ [（），] /）;
      shape = shapeArgs.shift（）;
      if（typeof window [shape] ==='function'）
        this.shape = window [形状];
      其他
        this.shape = pfuncs[shape] || pfuncs.sphere;
      this.shapeArgs = [taglist.length, rx, ry, rz].concat(shapeArgs);
    }
    vl = this.shape.apply(this, this.shapeArgs);
    this.listLength = taglist.length;
    for(i = 0; i < taglist.length; ++i)
      taglist[i].position = new Vector(vl[i][0], vl[i][1], vl[i][2]);
  }
  if(this.noTagsMessage && !taglist.length) {
    i = (this.imageMode && this.imageMode != 'both' ? this.imageMode + ' ': '');
    taglist = this.Message('No ' + i + 'tags');
  }
  this.taglist = taglist;
};
TCproto.Update = function() {
  var tl = this.GetTags(), newlist = [],
    taglist = this.taglist, found,
    added = [], removed = [], vl, ol, nl, i, j;

  if(!this.shapeArgs)
    return this.Load();

  if(tl.length) {
    nl = this.listLength = tl.length;
    ol = taglist.length;

    // copy existing list, populate "removed"
    for(i = 0; i < ol; ++i) {
      newlist.push(taglist[i]);
      removed.push(i);
    }

    // find added and removed tags
    for(i = 0; i < nl; ++i) {
      for(j = 0, found = 0; j < ol; ++j) {
        if(taglist[j].EqualTo(tl[i])) {
          this.UpdateTag(newlist[j], tl[i]);
          found = removed[j] = -1;
        }
      }
      if(!found)
        added.push(i);
    }

    // clean out found tags from removed list
    for(i = 0, j = 0; i < ol; ++i) {
      if(removed[j] == -1)
        removed.splice(j,1);
      else
        ++j;
    }

    // insert new tags in gaps where old tags removed
    if(removed.length) {
      Shuffle(removed);
      while(removed.length && added.length) {
        i = removed.shift();
        j = added.shift();
        newlist [i] = this.CreateTag（tl [j]）;
      }

      //再删除（按相反顺序）
      removed.sort（function（a，b）{return ab}）;
      while（removed.length）{
        newlist.splice（removed.pop（），1）;
      }
    }

    //添加任何额外的标签
    j = newlist.length /（added.length + 1）;
    i = 0;
    while（added.length）{
      newlist.splice（ceil（++ i * j），0，this.CreateTag（tl [added.shift（）]））;
    }

    //为标签分配正确的位置
    this.shapeArgs [0] = nl = newlist.length;
    vl = this.shape.apply（this，this.shapeArgs）;
    for（i = 0; i <nl; ++ i）
      newlist [i] .position = new Vector（vl [i] [0]，vl [i] [1]，vl [i] [2]）;

    //重新标记
    this.weight && this.Weight（newlist）;
  }
  this.taglist = newlist;
};
TCproto.SetShadow = function（c）{
  c.shadowBlur = this.shadowBlur;
  c.shadowOffsetX = this.shadowOffset [0];
  c.shadowOffsetY = this.shadowOffset [1];
};
TCproto.Draw = function（t）{
  如果（this.paused）
    返回;
  var cv = this.canvas，cw = cv.width，ch = cv.height，max_sc = 0，
    tdelta =（t  -  this.time）* TagCanvas.interval / 1000，
    x = cw / 2 + this.offsetX，y = ch / 2 + this.offsetY，c = this.ctxt，
    active，a，i，aindex = -1，tl = this.taglist，l = tl.length，
    frontsel = this.frontSelect，centreDrawn =（this.centreFunc == Nop），fixed;
  this.time = t;
  if（this.frozen && this.drawn）
    返回this.Animate（cw，ch，tdelta）;
  fixed = this.AnimateFixed（）;
  c.setTransform（1,0,0,1,0,0）;
  for（i = 0; i <l; ++ i）
    tl [i] .Calc（this.transform，this.fixedAlpha）;
  tl = SortList（tl，function（a，b）{return bz-az}）;

  if（fixed && this.fixedAnim.active）{
    active = this.fixedAnim.tag.UpdateActive（c，x，y）;
  } else {
    this.active = null;
    for(i = 0; i < l; ++i) {
      a = this.mx >= 0 && this.my >= 0 && this.taglist[i].CheckActive(c, x, y);
      if(a && a.sc > max_sc && (!frontsel || a.z <= 0)) {
        active = a;
        aindex = i;
        active.tag = this.taglist[i];
        max_sc = a.sc;
      }
    }
    this.active = active;
  }

  this.txtOpt || (this.shadow && this.SetShadow(c));
  c.clearRect(0,0,cw,ch);
  for(i = 0; i < l; ++i) {
    if(!centreDrawn && tl[i].z <= 0) {
      // run the centreFunc if the next tag is at the front
      try { this.centreFunc(c, cw, ch, x, y); }
      catch(e) {
        alert(e);
        // don't run it again
        this.centreFunc = Nop;
      }
      centreDrawn = true;
    }

    if(!(active && active.tag == tl[i] && active.PreDraw(c, tl[i], x, y)))
      tl[i].Draw(c, x, y);
    active && active.tag == tl[i] && active.PostDraw(c);
  }
  if(this.freezeActive && active) {
    this.Freeze();
  } else {
    this.UnFreeze();
    this.drawn =（l == this.listLength）;
  }
  if（this.fixedCallback）{
    this.fixedCallback（此，this.fixedCallbackTag）;
    this.fixedCallback = null;
  }
  固定|| this.Animate（cw，ch，tdelta）;
  active && active.LastDraw（c）;
  cv.style.cursor =有效吗？this.activeCursor：'';
  this.Tooltip（活性，this.taglist [aindex]）;
};
TCproto.TooltipNone = function（）{};
TCproto.TooltipNative = function（active，tag）{
  如果（有源）
    this.canvas.title = tag && tag.title？tag.title：'';
  其他
    this.canvas.title = this.ctitle;
};
TCproto.SetTTDiv = function（title，tag）{
  var tc = this，s = tc.ttdiv.style;
  if（title！= tc.ttdiv.innerHTML）
    s.display ='无';
  tc.ttdiv.innerHTML = title;
  tag &&（tag.title = tc.ttdiv.innerHTML）;
  if（s.display =='none'&&！tc.tttimer）{
    tc.tttimer = setTimeout(function() {
      var p = AbsPos(tc.canvas.id);
      s.display = 'block';
      s.left = p.x + tc.mx + 'px';
      s.top = p.y + tc.my + 24 + 'px';
      tc.tttimer = null;
    }, tc.tooltipDelay);
  }
};
TCproto.TooltipDiv = function(active,tag) {
  if(active && tag && tag.title) {
    this.SetTTDiv(tag.title, tag);
  } else if(!active && this.mx != -1 && this.my != -1 && this.ctitle.length) {
    this.SetTTDiv(this.ctitle);
  } else {
    this.ttdiv.style.display ='none';
  }
};
TCproto.Transform = function（tc，p，y）{
  if（p || y）{
    var sp = sin（p），cp = cos（p），sy = sin（y），cy = cos（y），
      ym = new Matrix（[cy，0，sy，0,1,0，-sy，0，cy]），
      pm = new Matrix（[1,0,0,0，cp，-sp，0，sp，cp]）;
    tc.transform = tc.transform.mul（ym.mul（pm））;
  }
};
TCproto.AnimateFixed = function（）{
  var fa，t1，angle，m，d;
  if（this.fadeIn）{
    t1 = TimeNow（） -  this.startTime;
    if（t1> = this.fadeIn）{
      this.fadeIn = 0;
      this.fixedAlpha = 1;
    } else {
      this.fixedAlpha = t1 / this.fadeIn;
    }
  }
  if（this.fixedAnim）{
    如果（！this.fixedAnim.transform）
      this.fixedAnim.transform = this.transform;
    fa = this.fixedAnim，t1 = TimeNow（） -  fa.t0，angle = fa.angle，
      m，d = this.animTiming（fa.t，t1）;
    this.transform = fa.transform;
    if（t1> = fa.t）{
      this.fixedCallbackTag = fa.tag;
      this.fixedCallback = fa.cb;
      this.fixedAnim = this.yaw = this.pitch = 0;
    } else {
      angle *= d;
    }
    m = Matrix.Rotation(angle, fa.axis);
    this.transform = this.transform.mul(m);
    return (this.fixedAnim != 0);
  }
  return false;
};
TCproto.AnimatePosition = function(w, h, t) {
  var tc = this, x = tc.mx, y = tc.my, s, r;
  if(!tc.frozen && x >= 0 && y >= 0 && x < w && y < h) {
    s = tc.maxSpeed, r = tc.reverse ? -1 : 1;
    tc.lx || (tc.yaw = ((x * 2 * s / w) - s) * r * t);
    tc.ly || (tc.pitch = ((y * 2 * s / h) - s) * -r * t);
    tc.initial = null;
  } else if(!tc.initial) {
    if(tc.frozen && !tc.freezeDecel)
      tc.yaw = tc.pitch = 0;
    else
      tc.Decel(tc);
  }
  this.Transform(tc, tc.pitch, tc.yaw);
};
TCproto.AnimateDrag = function（w，h，t）{
  var tc = this，rs = 100 * t * tc.maxSpeed / tc.max_radius / tc.zoom;
  if（tc.dx || tc.dy）{
    tc.lx || （tc.yaw = tc.dx * rs / tc.stretchX）;
    tc.ly || （tc.pitch = tc.dy * -rs / tc.stretchY）;
    tc.dx = tc.dy = 0;
    tc.initial = null;
  } else if（！tc.initial）{
    tc.Decel（TC）;
  }
  this.Transform（tc，tc.pitch，tc.yaw）;
};
TCproto.Freeze = function（）{
  if（！this.frozen）{
    this.preFreeze = [this.yaw，this.pitch];
    this.frozen = 1;
    this.drawn = 0;
  }
};
TCproto.UnFreeze = function（）{
  if（this.frozen）{
    this.yaw = this.preFreeze [0];
    this.pitch = this.preFreeze [1];
    this.frozen = 0;
  }
};
TCproto.Decel = function（tc）{
  var s = tc.minSpeed，ay = abs（tc.yaw），ap = abs（tc.pitch）;
  if（！tc.lx && ay> s）
    tc.yaw = ay> tc.z0？tc.yaw * tc.decel：0;
  if（！tc.ly && ap> s）
    tc.pitch = ap> tc.z0？tc.pitch * tc.decel：0;
};
TCproto.Zoom = function（r）{
  this.z2 = this.z1 *（1 / r）;
  this.drawn = 0;
};
TCproto.Clicked = function（e）{
  var a = this.active;
  尝试{
    if（a && a.tag）
      if（this.clickToFront === false || this.clickToFront === null）
        a.tag.Clicked（E）;
      其他
        this.TagToFront（a.tag，this.clickToFront，function（）{
          a.tag.Clicked（E）;
        ，真实）;
  } catch（ex）{
  }
};
TCproto.Wheel = function（i）{
  var z = this.zoom + this.zoomStep *（i？1：-1）;
  this.zoom = min（this.zoomMax，max（this.zoomMin，z））;
  this.Zoom（this.zoom）;
};
TCproto.BeginDrag = function（e）{
  this.down = EventXY（e，this.canvas）;
  e.cancelBubble = true;
  e.returnValue = false;
  e.preventDefault && e.preventDefault（）;
};
TCproto.Drag = function（e，p）{
  if（this.dragControl && this.down）{
    var t2 = this.dragThreshold * this.dragThreshold，
      dx = px  -  this.down.x，dy = py  -  this.down.y;
    if（this.dragging || dx * dx + dy * dy> t2）{
      this.dx = dx;
      this.dy = dy;
      this.dragging = 1;
      this.down = p;
    }
  }
  返回此.dragging;
};
TCproto.EndDrag = function（）{
  var res = this.dragging;
  this.dragging = this.down = null;
  return res;
};
function PinchDistance(e) {
  var t1 = e.targetTouches[0], t2 = e.targetTouches[1];
  return sqrt(pow(t2.pageX - t1.pageX, 2) + pow(t2.pageY - t1.pageY, 2));
}
TCproto.BeginPinch = function(e) {
  this.pinched = [PinchDistance(e), this.zoom];
  e.preventDefault && e.preventDefault();
};
TCproto.Pinch = function(e) {
  var z, d, p = this.pinched;
  if(!p)
    return;
  d = PinchDistance(e);
  z = p[1] * d / p[0];
  this.zoom = min(this.zoomMax,max(this.zoomMin,z));
  this.Zoom(this.zoom);
};
TCproto.EndPinch = function(e) {
  this.pinched = null;
};
TCproto.Pause = function() { this.paused = true; };
TCproto.Resume = function() { this.paused = false; };
TCproto.SetSpeed = function(i) {
  this.initial = i;
  this.yaw = i[0] * this.maxSpeed;
  this.pitch = i [1] * this.maxSpeed;
};
TCproto.FindTag = function（t）{
  如果（！定义（T））
    return null;
  定义（t.index）&&（t = t.index）;
  如果（！则IsObject（T））
    return this.taglist [t];
  var srch，tgt，i;
  如果（定义（t.id））
    srch ='id'，tgt = t.id;
  else if（Defined（t.text））
    srch ='innerText'，tgt = t.text;

  for（i = 0; i <this.taglist.length; ++ i）
    if（this.taglist [i] .a [srch] == tgt）
      return this.taglist [i];
};
TCproto.RotateTag = function（tag，lt，lg，time，callback，active）{
  var t = tag.Calc（this.transform，1），v1 = new Vector（tx，ty，tz），
    v2 = MakeVector（lg，lt），angle = v1.angle（v2），u = v1.cross（v2）.unit（）;
  if（angle == 0）{
    this.fixedCallbackTag = tag;
    this.fixedCallback =回调;
  } else {
    this.fixedAnim = {
      角度：角，
      轴：你，
      t：时间，
      t0：TimeNow（），
      cb：回调，
      tag：tag，
      活动：活跃
    };
  }
};
TCproto.TagToFront = function（tag，time，callback，active）{
  this.RotateTag（tag，0,0，time，callback，active）;
};
TagCanvas.Start = function（id，l，o）{
  TagCanvas.Delete（ID）;
  TagCanvas.tc [id] =新的TagCanvas（id，l，o）;
};
function tccall（f，id）{
  TagCanvas.tc [id] && TagCanvas.tc [id] [f]（）;
}
TagCanvas.Linear = function（t，t0）{return t0 / t; }
TagCanvas.Smooth = function（t，t0）{return 0.5  -  cos（t0 * Math.PI / t）/ 2; }
TagCanvas.Pause = function（id）{tccall（'Pause'，id）; };
TagCanvas.Resume = function（id）{tccall（'Resume'，id）; };
TagCanvas.Reload = function（id）{tccall（'Load'，id）; };
TagCanvas.Update = function（id）{tccall（'Update'，id）; };
TagCanvas.SetSpeed = function（id，speed）{
  if（IsObject（speed）&& TagCanvas.tc [id] &&
    ！isNaN（speed [0]）&&！isNaN（speed [1]））{
    TagCanvas.tc [ID] .SetSpeed（速度）;
    返回true;
  }
  返回虚假;
};
TagCanvas.TagToFront = function（id，options）{
  如果（！则IsObject（选项））
    返回虚假;
  options.lat = options.lng = 0;
  return TagCanvas.RotateTag（id，options）;
};
TagCanvas.RotateTag = function（id，options）{
  if（IsObject（options）&& TagCanvas.tc [id]）{
    如果（isNaN（options.time））
      options.time = 500;
    var tt = TagCanvas.tc [id] .FindTag（options）;
    if（tt）{
      TagCanvas.tc [id] .RotateTag（tt，options.lat，options.lng，
        options.time，options.callback，options.active）;
      返回true;
    }
  }
  返回虚假;
};
TagCanvas.Delete = function（id）{
  var i，c;
  if（handlers [id]）{
    c = doc.getElementById（id）;
    if（c）{
      for（i = 0; i <handlers [id] .length; ++ i）
        RemoveHandler（handlers [id] [i] [0]，handlers [id] [i] [1]，c）;
    }
  }
  删除处理程序[id];
  删除TagCanvas.tc [id];
};
TagCanvas.NextFrameRAF = function（）{
  requestAnimationFrame（DrawCanvasRAF）;
};
TagCanvas.NextFrameTimeout = function（iv）{
  setTimeout（DrawCanvas，iv）;
};
TagCanvas.tc = {};
TagCanvas.options = {
z1：20000，
z2：20000，
z0：0.0002，
freezeActive：是的，
freezeDecel：false，
activeCursor：'指针'，
pulsateTo：1，
pulsate时间：3，
反转：假，
深度：0.5，
maxSpeed：0.05，
minSpeed：0，
减速：0.95，
间隔：20，
minBrightness：0.1，
maxBrightness：1，
outlineColour：''，
outlineThickness：2，
outlineOffset：5，
outlineMethod：'outline'，
outlineRadius：0，
textColour：['＃222'，'＃000']，
textHeight：15，
textFont：'Helvetica，Arial，sans-serif'，
影子：'＃111'，
shadowBlur：1，
shadowOffset：[0.1,0.1]，
initial：null，
hideTags：false，
缩放：0，
重量：假，
weightMode：'size'，
weightFrom：null，
weightSize：1，
weightSizeMin：null，
weightSizeMax：null，
weightGradient：{0：'＃f00'，0.33：'＃ff0'，0.66：'＃0f0'，1：'＃00f'}，
txtOpt：是的，
txtScale：2，
frontSelect：false，
wheelZoom：是的，
zoomMin：0.8，
zoomMax：0.8，
zoomStep：0.05，
形状：'球体'，
锁：null，
工具提示：null，
tooltipDelay：300，
tooltipClass：'tctooltip'，
radiusX：1，
radiusY：1，
radiusZ：1，
stretchX：1，
stretchY：1，
offsetX：0，
offsetY：0，
shuffleTags：false，
noSelect：false，
noMouse：false，
imageScale：1，
暂停：假，
dragControl：false，
dragThreshold：4，
centreFunc：Nop，
splitWidth：0，
动画时间：'顺畅'，
clickToFront：false，
淡出：0，
填充：0，
bgColour：null，
bgRadius：0，
bgOutline：null，
bgOutlineThickness：0，
outlineIncrease：4，
textAlign：'center'，
textVAlign：'middle'，
imageMode：null，
imagePosition：null，
imagePadding：2，
imageAlign：'中心'，
imageVAlign：'middle'，
noTagsMessage：是的，
centreImage：null，
pinch缩放器：false，
repeatTags：0，
minTags：0，
imageRadius：0，
scrollPause：false，
outlineDash：0，
outlineDashSpace：0，
outlineDashSpeed：1
};
for（i in TagCanvas.options）TagCanvas [i] = TagCanvas.options [i];
window.TagCanvas = TagCanvas;
//为窗口加载时设置一个标志
的AddHandler（ '负载'，函数（）{TagCanvas.loaded = 1}，窗口）;
}）（）;