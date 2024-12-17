import 'dart:convert';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_multipart/shelf_multipart.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:mysql1/mysql1.dart';

Future<MySqlConnection> getDatabaseConnection() async {
  return await MySqlConnection.connect(ConnectionSettings(
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'your_new_password',
    db: 'penjahat_db',
  ));
}

Middleware corsMiddleware() {
  return (Handler innerHandler) {
    return (Request request) async {
      if (request.method == 'OPTIONS') {
        return Response.ok(
          '',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        );
      }

      final response = await innerHandler(request);
      return response.change(
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      );
    };
  };
}

Future<Response> createData(Request request) async {
  var payload = await request.readAsString();
  var data = jsonDecode(payload);
  if (data['username'] == null || data['password'] == null) {
    return Response(400, body: 'Missing required fields: username, password');
  }
  var conn = await getDatabaseConnection();
  var result = await conn.query('INSERT INTO users (username, password) VALUES (?, ?)',
      [data['username'], data['password']]);
  await conn.close();
  return Response.ok('Data inserted with ID: ${result.insertId}');
}

Future<Response> readDataPage(Request request) async {
  var conn = await getDatabaseConnection();

  // Fetch the first row from the aboutpage table
  var results = await conn.query('SELECT * FROM aboutpage LIMIT 1');
  await conn.close();

  // If results are found, process them
  if (results.isNotEmpty) {
    var row = results.first;
    // Return the data as a single JSON object
    var data = {
      'titlePage': row[0].toString() ?? '',
      'descriptionPage': row[1].toString() ?? '',
      'phoneNumber': row[2].toString() ?? '',
      'id': row[3].toString() ?? '',
      'address': row[4].toString() ?? '',
      'email': row[5].toString() ?? '',
      'twitter': row[6].toString() ?? '',
      'facebook': row[7].toString() ?? '',
      'instagram': row[8].toString() ?? '',
      'linkedin': row[9].toString() ?? '',
      'image_header': row[10].toString() ?? '',
      'image': row[11].toString() ?? '',
      'subtitle': row[12].toString() ?? '',
      'subdescription': row[13].toString() ?? '',
      'maps': row[14].toString() ?? '',
    };

    return Response.ok(jsonEncode(data), headers: {'Content-Type': 'application/json'});
  } else {
    // If no data is found, return an empty response or error message
    return Response.notFound('No data found');
  }
}

Future<Map<String, Multipart?>> getFormData(Request req) async {
  final FormDataRequest? request = req.formData();

  if (request == null) {
    throw Exception();
  }

  return <String, Multipart?>{
    await for (final FormData formData in request.formData)
      formData.name: formData.part,
  };
}

Future<Response> initEvent(Request request) async {
  var conn = await getDatabaseConnection();

  // Fetch the first row from the aboutpage table
  var results = await conn.query('SELECT * FROM events');
  await conn.close();
  // If results are found, process them
  if (results.isNotEmpty) {
    var event = results.map((row) {
      return {
        'image': row[4].toString(),
        'description': row[3].toString(),
        'title': row[2].toString(),
        'category': row[1].toString(),
      };
    }).toList();

    return Response.ok(jsonEncode(event), headers: {'Content-Type': 'application/json'});
  } else {
    // If no data is found, return an empty response or error message
    return Response.notFound('No data found');
  }
}

Future<Response> initService(Request request) async {
  var conn = await getDatabaseConnection();

  // Fetch the first row from the aboutpage table
  var results = await conn.query('SELECT * FROM services');
  await conn.close();
  // If results are found, process them
  if (results.isNotEmpty) {
    var event = results.map((row) {
      return {
        'image': row[2].toString(),
        'description': row[1].toString(),
        'title': row[0].toString(),
      };
    }).toList();

    return Response.ok(jsonEncode(event), headers: {'Content-Type': 'application/json'});
  } else {
    // If no data is found, return an empty response or error message
    return Response.notFound('No data found');
  }
}

Future<Response> initCrew(Request request) async {
  var conn = await getDatabaseConnection();

  var results = await conn.query('SELECT * FROM penjahat_crew');
  await conn.close();
  // If results are found, process them
  if (results.isNotEmpty) {
    var event = results.map((row) {
      return {
        'image': row[6].toString(),
        'linkedin': row[5].toString(),
        'instagram': row[4].toString(),
        'facebook': row[3].toString(),
        'title': row[2].toString(),
        'name': row[1].toString(),
      };
    }).toList();

    return Response.ok(jsonEncode(event), headers: {'Content-Type': 'application/json'});
  } else {
    // If no data is found, return an empty response or error message
    return Response.notFound('No data found');
  }
}

Future<Response> initPortopolio(Request request) async {
  var conn = await getDatabaseConnection();

  // Fetch the first row from the aboutpage table
  var results = await conn.query('SELECT * FROM events');
  await conn.close();
  // If results are found, process them
  if (results.isNotEmpty) {
    var event = results.map((row) {
      return {
        'image': row[4].toString(),
        'description': row[3].toString(),
        'title': row[2].toString(),
        'category': row[1].toString(),
      };
    }).toList();

    return Response.ok(jsonEncode(event), headers: {'Content-Type': 'application/json'});
  } else {
    // If no data is found, return an empty response or error message
    return Response.notFound('No data found');
  }
}


Future<Response> insertBooking(Request request) async {
  try {
    var payload = await request.readAsString();
    print('Received Payload: $payload'); // Debugging to check the payload

    var data = jsonDecode(payload);
    var nama = data['nama'];
    var email = data['email'];
    var subject = data['subject'];
    var message = data['message'];

    if (nama == null || email == null || subject == null || message == null) {
      return Response(400, body: 'Missing required fields: nama, email, subject, message');
    }

    var conn = await getDatabaseConnection();
    var result = await conn.query(
        'INSERT INTO booking_events (nama, email, subject, message) VALUES (?, ?, ?, ?)',
        [nama, email, subject, message]);
    await conn.close();

    return Response.ok(
      jsonEncode({'message': 'Data inserted successfully with ID: ${result.insertId}'}),
      headers: {'Content-Type': 'application/json'},
    );
  } catch (e) {
    return Response.internalServerError(body: 'Internal server error: $e');
  }
}




void main() async {
  var router = Router();
  router.get('/initCrew', initCrew);
  router.get('/initPortopolio', initPortopolio);
  router.get('/initService', initService);
  router.get('/initEvent', initEvent);
  router.get('/initPage', readDataPage);
  router.post('/booking', insertBooking);

  var handler = const Pipeline()
      .addMiddleware(corsMiddleware())
      .addHandler(router);

  var server = await shelf_io.serve(handler, 'localhost', 8080);
  print('Server listening on port ${server.port}');
}
