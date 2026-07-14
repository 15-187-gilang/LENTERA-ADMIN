<?php
$url = 'http://127.0.0.1:8000/api/achievements';
$data = [
    'category_id' => 1,
    'title' => 'Test',
    'recipient' => 'Test',
    'organizer' => 'Test',
    'level' => 'Kabupaten',
    'achievement_date' => '2023-10-10',
    'description' => 'Test description',
    'featured' => 0,
    'is_published' => 0
];

$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\nAccept: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
        'ignore_errors' => true
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo $result;
