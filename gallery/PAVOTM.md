---
title: Photos and Videos of the Month
layout: page
section: gallery
---

<!DOCTYPE html>
<html>
<head>
<style>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 50%;
  padding: 5px;
}

.single-column {
  width: 100%;
}

/* Clearfix (clear floats) */
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>
</head>
<body>

<p>Each month, our chapter members vote for the best weather photo and club photo of the month. A new tradition was started in 2021, where our chapter members could start to vote for the best video of the month on top of the best weather and club photos of the month. Here you can view the current and past photos and videos of the month.</p>

<!-- Repeat the pattern for subsequent months -->

<h2>September 2018 Photos of the Month</h2>
<div class="row">
  <div class="column">
  	<h3>Club Photo of the Month</h3>
    <img src="{{ site.baseurl }}/uploads/PHOTM/2018-2019/Sep_2018_Club.jpg?raw=true" alt="September 2018 Club Photo of Month" style="width:100%">
  </div>
  <div class="column">
  	<h3>Weather Photo of the Month</h3>
    <img src="{{ site.baseurl }}/uploads/PHOTM/2018-2019/Sep_2018_Wx.jpeg" alt="September 2018 Wx Photo of Month" style="width:100%">
</div>

<h2>August 2018 Photo of the Month</h2>
<div class="row">
  <div class="column single-column">
    <h3>Weather Photo of the Month</h3>
    <img src="{{ site.baseurl }}/uploads/PHOTM/2018-2019/Aug_2018_Wx.jpg" alt="August 2018 Wx Photo of Month" style="width:100%">
  </div>
</div>

</body>
</html>
