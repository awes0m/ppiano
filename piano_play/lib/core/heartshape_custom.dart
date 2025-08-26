import 'package:flutter/material.dart';

class HeartThumbPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors
          .red // Heart color
      ..style = PaintingStyle.fill;

    final path = Path();
    path.moveTo(size.width / 2, size.height * 0.4);
    path.cubicTo(
      size.width * 0.8,
      size.height * 0.1,
      size.width * 0.9,
      size.height * 0.6,
      size.width / 2,
      size.height * 0.9,
    );
    path.cubicTo(
      size.width * 0.1,
      size.height * 0.6,
      size.width * 0.2,
      size.height * 0.1,
      size.width / 2,
      size.height * 0.4,
    );
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}
