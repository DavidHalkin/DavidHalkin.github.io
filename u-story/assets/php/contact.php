<?php

	if($_SERVER['REQUEST_METHOD'] != 'POST') die();

	$from    = 'info@ustorybrand.com';
	$to      = 'dl@ustorybrand.com';
	$subject = 'Новый заказ';

	$name    = strip_tags(trim($_POST['name']));
	$phone   = strip_tags(trim($_POST['phone']));
	$vendor   = strip_tags(trim($_POST['vendor']));
	$size   = strip_tags(trim($_POST['size']));

    if($phone && $name) {
    	$response = 'Заявка принята, мы вам перезвоним';
    	$message = "Имя: $name, телефон: $phone,\n артикул: $vendor, размер: $size";
    } else {
    	$res['error'] = 'Заполните форму';
    }

	if(!$res['error'] && mail($to, $subject, $message)){	
		$res['message'] = $response;
    } else if (!$res['error']) {
		$res['error'] = 'Не удалось отправить сообщение.';
	}
	
	echo json_encode($res);
	die();

?>