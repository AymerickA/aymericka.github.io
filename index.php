<?php 
session_start();
?>

<!DOCTYPE html>
<html>
<head>
<?php include_once('includes/GENERAL_head.php'); ?>
</head>
<body>

<?php include_once('includes/header.php'); ?>

<?php if(isset($_GET['recentlyLogin'])) : //Show if user just logged his account ?>
	<p class="info_success">You have been successfully login!</p>
<?php elseif (isset($_GET['recentlyLogout'])) : //Show if user just logout his account ?>
	<p class="info_neutral">You have been logout with success</p>
<?php endif; ?>

	<section class="body-page" id="home">
		<p>Welcome to Ciné Critic, the website to publish at each your reviews of: <mark>Movies, Theaters plays, Series, Video games...</mark></p>
		<p>This website was created in March 2022 to allow students and teachers to collect their reviews on a single and same website</p>
		<p><strong>Functioning of website:</strong></p>
		<p>You can already click on the tab "reviews" if you want see the proposed reviews</p>
		<p>Then if you want also publish your reviews, you can now create an account on our website to access all our features</p>
		<p>Finally there is also a status of "Verified User" who can be delivred to you allowing to publish works that can be subject of reviews</p>

		<img src="img/clapper.svg">
	</section>

<?php include_once('includes/footer.php'); ?>

</body>
</html>