<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$request = $data->request;
$carname = $data->carname;

// Fetch All records
if ($request == 1) {
    $userData = mysqli_query($con, "SELECT * FROM " . $carname . " ORDER BY id DESC");
    if (mysqli_num_rows($userData) == 0) {
        exit;
    } else {
        $response = array();
        while ($row = mysqli_fetch_assoc($userData)) {
            $response[] = $row;
        }
        echo json_encode($response);
    }
    exit;
}

// Add record
if ($request == 2) {
    $name = $data->name;
    $description = $data->description;
    $price = $data->price;
    $date = $data->date;
    $mileage = $data->mileage;

    mysqli_query($con, "INSERT INTO " . $carname . "  (name, description, price, date, mileage) VALUES('" . $name . "','" . $description . "'," . $price . ",'" . $date . "'," . $mileage . ")");

    exit;
}

// Update record
if ($request == 3) {
    $id = $data->id;
    $name = $data->name;
    $description = $data->description;
    $price = $data->price;
    $date = $data->date;
    $mileage = $data->mileage;

    mysqli_query($con, "UPDATE " . $carname . " SET name='" . $name . "',description='" . $description . "',price='" . $price . "',date='" . $date . "',mileage='" . $mileage . "' WHERE id=" . $id);

    echo "Update successfully";
    exit;
}

// Delete record
if ($request == 4) {
    $id = $data->id;

    mysqli_query($con, "DELETE FROM " . $carname . " WHERE id=" . $id);

    echo "Delete successfully";
    exit;
}

// Get all cars from database
if ($request == 5) {
    $userdata1 = mysqli_query($con, "SELECT TABLE_NAME AS carname FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'm11524_servicebook'");
    if (mysqli_num_rows($userdata1) == 0) {
        exit;
    } else {
        $return = array();
        while ($row1 = mysqli_fetch_assoc($userdata1)) {
            $return[] = $row1;
        }
        echo json_encode($return);
    }
    exit;
}

// Delete car
if ($request == 6) {
    $tablename = $data->carname;

    mysqli_query($con, "DROP TABLE  " . $tablename);
    exit;
}

// Add car
if ($request == 7) {
    $tablename = $data->carname;

    mysqli_query($con, "CREATE TABLE " . $tablename . " (`id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `name` VARCHAR(100) NOT NULL, `description` TEXT, `price` INT NOT NULL, `date` DATE NOT NULL, `mileage` INT NOT NULL)");
    exit;
}

$con->close();