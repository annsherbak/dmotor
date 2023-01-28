<?php
 include 'connection.php';

if ($conn) {

  function getSelection()
  {
    //Мощность
    $minPower = (isset($_GET['min_power'])) ? (int)$_GET['min_power'] : 0;
    $maxPower = (isset($_GET['max_power'])) ? (int)$_GET['max_power'] : 100000;

    //Номинальный крутящий момент
    $minTorque = (isset($_GET['min_torque'])) ? (int)$_GET['min_torque'] : 0;
    $maxTorque = (isset($_GET['max_torque'])) ? (int)$_GET['max_torque'] : 1000;

    //Скорость
    $speed_nominal = (isset($_GET['speed'])) ? implode(',', $_GET['speed']) : null;

    //Фланец
    $flange = (isset($_GET['flange'])) ? implode(',', $_GET['flange']) : null;

    //Энкодер
    $encoder = (isset($_GET['encoder'])) ? implode(',', $_GET['encoder']) : null;

    //Напряжение питания
    $voltage = (isset($_GET['voltage'])) ? implode(',', $_GET['voltage']) : null;


    $dataSelection =
      [
        'min_power' => $minPower,
        'max_power' => $maxPower,
        'min_torque' => $minTorque,
        'max_torque' => $maxTorque,
        'speed_nominal' => $speed_nominal,
        'flange' => $flange,
        'encoder' => $encoder,
        'voltage' => $voltage
      ];
    return $dataSelection;
  }
  //Получение результатов выбора клиента
  $dataSelection = getSelection();

  function getGoods($conn, $dataSelection)
  {
    $minPower = $dataSelection['min_power'];
    $maxPower = $dataSelection['max_power'];
    $minTorque = $dataSelection['min_torque'];
    $maxTorque = $dataSelection['max_torque'];
    $speedNominal = $dataSelection['speed_nominal'];
    $flange = $dataSelection['flange'];
    $encoder = $dataSelection['encoder'];
    $voltage = $dataSelection['voltage'];
    
    $flangeWhere = ($flange !== null) ? "`flange` IN ($flange) AND" : "";
    $encoderWhere = ($encoder !== null) ? "`encoder` IN ($encoder) AND" : "";
    $voltageWhere = ($voltage !== null) ? "`voltage` IN ($voltage) AND" : "";
    $speedWhere = ($speedNominal !== null) ? "`speed_nominal` IN ($speedNominal) AND" : "";

    $query = "
        SELECT *
        FROM `servo` 
        WHERE 
        $flangeWhere
        $voltageWhere
        $encoderWhere
        $speedWhere
        (`power` between $minPower and $maxPower) AND
        (`torque_nominal` between $minTorque and $maxTorque)
        ORDER BY `power`;
    ";
    $pgs = mysqli_query($conn, $query);
    return $dataResult = mysqli_fetch_all($pgs, MYSQLI_ASSOC);
  }

  //Получение товаров из БД
  $dataResult = getGoods($conn, $dataSelection);

  //Возврат клиенту успешного ответа
  $result = json_encode(array(
    'code' => 'success',
    'selection' => $dataSelection,
    'result' => $dataResult
  ), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

  header('Content-type:application/json;charset=utf-8');

  echo  $result;
  exit();
}
