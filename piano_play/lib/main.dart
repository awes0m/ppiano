// ignore_for_file: deprecated_member_use

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';
import 'data.dart';

void main() {
  runApp(const PianoApp());
}

class PianoApp extends StatelessWidget {
  const PianoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Piano',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
      ),
      home: const PianoHomePage(),
    );
  }
}

class PianoHomePage extends StatefulWidget {
  const PianoHomePage({super.key});

  @override
  State<PianoHomePage> createState() => _PianoHomePageState();
}

class _PianoHomePageState extends State<PianoHomePage> {
  final List<List<int>> _activeWhites = []; // [index, ticks]
  final List<List<int>> _activeBlacks = []; // [index, ticks]

  int leftOct = 4;
  int rightOct = 5;

  // Map pressed character to note label using octaves
  String? _mapCharToNote(String char) {
    final c = char.toUpperCase();
    final leftMap = {
      'Z': 'C$leftOct',
      'S': 'C#$leftOct',
      'X': 'D$leftOct',
      'D': 'D#$leftOct',
      'C': 'E$leftOct',
      'V': 'F$leftOct',
      'G': 'F#$leftOct',
      'B': 'G$leftOct',
      'H': 'G#$leftOct',
      'N': 'A$leftOct',
      'J': 'A#$leftOct',
      'M': 'B$leftOct',
    };
    final rightMap = {
      'R': 'C$rightOct',
      '5': 'C#$rightOct',
      'T': 'D$rightOct',
      '6': 'D#$rightOct',
      'Y': 'E$rightOct',
      'U': 'F$rightOct',
      '8': 'F#$rightOct',
      'I': 'G$rightOct',
      '9': 'G#$rightOct',
      'O': 'A$rightOct',
      '0': 'A#$rightOct',
      'P': 'B$rightOct',
    };
    return leftMap[c] ?? rightMap[c];
  }

  // Convert label to actual asset filename. Handles sharps by mapping to flats
  String _labelToAsset(String label) {
    // Black key label example: C#4 -> Db4.wav in assets
    if (label.contains('#')) {
      final base = label[0];
      final octave = label.substring(2);
      final map = {'A': 'Bb', 'C': 'Db', 'D': 'Eb', 'F': 'Gb', 'G': 'Ab'};
      final flat = map[base]!;
      return 'assets/notes/${flat + octave}.wav';
    }
    return 'assets/notes/$label.wav';
  }

  Future<void> _playNote(String label) async {
    final path = _labelToAsset(label).replaceFirst('assets/', '');
    // Multiple rapid plays should overlay; use a new player instance per note
    final player = AudioPlayer();
    await player.play(AssetSource(path));
  }

  bool _isWhite(String label) => PianoData.whiteNotes.contains(label);

  void _markActive(String label) {
    if (_isWhite(label)) {
      final idx = PianoData.whiteNotes.indexOf(label);
      _activeWhites.add([idx, 30]);
    } else {
      final idx = PianoData.blackLabels.indexOf(label);
      if (idx >= 0) {
        _activeBlacks.add([idx, 30]);
      }
    }
    setState(() {});
  }

  // Handle RawKeyboard for desktop/web
  void _onKey(RawKeyEvent e) {
    if (e is RawKeyDownEvent) {
      // Arrow keys for octave changes
      if (e.logicalKey == LogicalKeyboardKey.arrowRight && rightOct < 8) {
        setState(() => rightOct++);
      }
      if (e.logicalKey == LogicalKeyboardKey.arrowLeft && rightOct > 0) {
        setState(() => rightOct--);
      }
      if (e.logicalKey == LogicalKeyboardKey.arrowUp && leftOct < 8) {
        setState(() => leftOct++);
      }
      if (e.logicalKey == LogicalKeyboardKey.arrowDown && leftOct > 0) {
        setState(() => leftOct--);
      }

      final ch = e.character;
      if (ch != null && ch.isNotEmpty) {
        final note = _mapCharToNote(ch);
        if (note != null) {
          _playNote(note);
          _markActive(note);
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final focusNode = FocusNode();
    // Ensure focus when page is built
    SchedulerBinding.instance.addPostFrameCallback((_) {
      if (focusNode.canRequestFocus) focusNode.requestFocus();
    });

    return RawKeyboardListener(
      focusNode: focusNode,
      onKey: _onKey,
      child: Scaffold(
        backgroundColor: Colors.grey.shade300,
        appBar: AppBar(title: const Text('Programmable Piano!')),
        body: Column(
          children: [
            const _TitleBar(),
            Expanded(
              child: _Piano(
                activeWhites: _activeWhites,
                activeBlacks: _activeBlacks,
                onPlay: (label) {
                  _playNote(label);
                  _markActive(label);
                },
              ),
            ),
            _HandsBar(leftOct: leftOct, rightOct: rightOct),
          ],
        ),
      ),
    );
  }
}

class _TitleBar extends StatelessWidget {
  const _TitleBar();
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Image.asset('assets/logo.png', width: 80, height: 80),
          const SizedBox(width: 12),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Up/Down Arrows Change Left Hand',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 4),
                Text(
                  'Left/Right Arrows Change Right Hand',
                  style: TextStyle(fontSize: 16),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _HandsBar extends StatelessWidget {
  final int leftOct;
  final int rightOct;
  const _HandsBar({required this.leftOct, required this.rightOct});

  @override
  Widget build(BuildContext context) {
    TextStyle white = const TextStyle(
      color: Colors.white,
      fontFamily: 'Terserah',
      fontSize: 14,
    );
    TextStyle black = const TextStyle(
      color: Colors.black,
      fontFamily: 'Terserah',
      fontSize: 14,
    );

    Widget handBox(int oct, List<String> labels) {
      return Container(
        margin: const EdgeInsets.all(8),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: Colors.grey.shade600,
          border: Border.all(color: Colors.black, width: 2),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Wrap(
          spacing: 8,
          children: [
            Text(labels[0], style: white),
            Text(labels[2], style: white),
            Text(labels[4], style: white),
            Text(labels[5], style: white),
            Text(labels[7], style: white),
            Text(labels[9], style: white),
            Text(labels[11], style: white),
            Text(labels[1], style: black),
            Text(labels[3], style: black),
            Text(labels[6], style: black),
            Text(labels[8], style: black),
            Text(labels[10], style: black),
          ],
        ),
      );
    }

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        handBox(leftOct, PianoData.leftHand),
        handBox(rightOct, PianoData.rightHand),
      ],
    );
  }
}

class _Piano extends StatefulWidget {
  final List<List<int>> activeWhites; // [index, ticks]
  final List<List<int>> activeBlacks; // [index, ticks]
  final void Function(String label) onPlay;
  const _Piano({
    required this.activeWhites,
    required this.activeBlacks,
    required this.onPlay,
  });

  @override
  State<_Piano> createState() => _PianoState();
}

class _PianoState extends State<_Piano> with SingleTickerProviderStateMixin {
  late final Ticker _ticker;

  @override
  void initState() {
    super.initState();
    _ticker = Ticker((_) {
      setState(() {
        for (final w in widget.activeWhites) {
          if (w[1] > 0) w[1] -= 1;
        }
        for (final b in widget.activeBlacks) {
          if (b[1] > 0) b[1] -= 1;
        }
        widget.activeWhites.removeWhere((e) => e[1] <= 0);
        widget.activeBlacks.removeWhere((e) => e[1] <= 0);
      });
    });
    _ticker.start();
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Width similar to python: 52 white keys * 35
    const whiteKeyWidth = 35.0;
    const whiteKeyHeight = 300.0;
    const blackKeyWidth = 24.0;
    const blackKeyHeight = 200.0;

    final totalWidth = 52 * whiteKeyWidth;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: SizedBox(
        width: totalWidth,
        height: whiteKeyHeight + 120,
        child: Stack(
          children: [
            // White keys
            Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                for (int i = 0; i < 52; i++)
                  _WhiteKey(
                    label: PianoData.whiteNotes[i],
                    width: whiteKeyWidth,
                    height: whiteKeyHeight,
                    active: widget.activeWhites.any((e) => e[0] == i),
                    onTap: () => widget.onPlay(PianoData.whiteNotes[i]),
                  ),
              ],
            ),
            // Black keys overlay using manual Positioned widgets
            ..._buildBlackKeys(
              whiteKeyWidth: whiteKeyWidth,
              blackKeyWidth: blackKeyWidth,
              blackKeyHeight: blackKeyHeight,
            ),
          ],
        ),
      ),
    );
  }

  List<Widget> _buildBlackKeys({
    required double whiteKeyWidth,
    required double blackKeyWidth,
    required double blackKeyHeight,
  }) {
    final widgets = <Widget>[];
    int skipCount = 0;
    int lastSkip = 2;
    int skipTrack = 2;

    for (int i = 0; i < 36; i++) {
      final left = 23 + (i * whiteKeyWidth) + (skipCount * whiteKeyWidth);
      widgets.add(
        Positioned(
          left: left,
          bottom: 120,
          child: _BlackKey(
            label: PianoData.blackLabels[i],
            width: blackKeyWidth,
            height: blackKeyHeight,
            active: widget.activeBlacks.any((e) => e[0] == i),
            onTap: () => widget.onPlay(PianoData.blackLabels[i]),
          ),
        ),
      );

      skipTrack += 1;
      if (lastSkip == 2 && skipTrack == 3) {
        lastSkip = 3;
        skipTrack = 0;
        skipCount += 1;
      } else if (lastSkip == 3 && skipTrack == 2) {
        lastSkip = 2;
        skipTrack = 0;
        skipCount += 1;
      }
    }

    return widgets;
  }
}

class _WhiteKey extends StatelessWidget {
  final String label;
  final double width;
  final double height;
  final bool active;
  final VoidCallback onTap;
  const _WhiteKey({
    required this.label,
    required this.width,
    required this.height,
    required this.active,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: width,
        height: height + 120,
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: Colors.black, width: 2),
          borderRadius: BorderRadius.circular(2),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            if (active)
              Container(
                height: 100,
                width: double.infinity,
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.green, width: 2),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(label, style: const TextStyle(fontSize: 10)),
            ),
          ],
        ),
      ),
    );
  }
}

class _BlackKey extends StatelessWidget {
  final String label;
  final double width;
  final double height;
  final bool active;
  final VoidCallback onTap;
  const _BlackKey({
    required this.label,
    required this.width,
    required this.height,
    required this.active,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: Colors.black,
          border: Border.all(color: Colors.black, width: 2),
          borderRadius: BorderRadius.circular(2),
        ),
        child: Stack(
          children: [
            if (active)
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.green, width: 2),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
            Align(
              alignment: const Alignment(0, 0.6),
              child: Text(
                label,
                style: const TextStyle(color: Colors.white, fontSize: 10),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
