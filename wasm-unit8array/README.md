<!-- 1. Canvas etiketini tanımlıyoruz -->
<canvas id="denemeCanvas" width="200" height="100" style="border:1px solid #d3d3d3;">
  Tarayıcınız canvas desteği sunmuyor.
</canvas>

<!-- 2. İçine bir şeyler çizmek için gereken script -->
<script>
  var c = document.getElementById("denemeCanvas");
  var ctx = c.getContext("2d");
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.strokeStyle = "#FF0000";
  ctx.stroke();
</script>
