import 'dart:html' as html;
import 'package:flutter/material.dart';

void main() => runApp(const GiyurAliyahApp());

class GiyurAliyahApp extends StatelessWidget {
  const GiyurAliyahApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Giyur Aliyah Track — Command Center',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0288E8),
          primary: const Color(0xFF082548),
          secondary: const Color(0xFF0288E8),
        ),
      ),
      home: const CommandCenterShell(),
    );
  }
}

class CommandCenterShell extends StatefulWidget {
  const CommandCenterShell({super.key});
  @override
  State<CommandCenterShell> createState() => _CommandCenterShellState();
}

class _CommandCenterShellState extends State<CommandCenterShell> {
  String activeModule = 'beit-din-150';
  String lang = 'en';

  final List> modules = const [
    {'id': 'beit-din-150', 'icon': '🕍', 'label': '150 Beit Din Deck'},
    {'id': 'couples-sync', 'icon': '📱', 'label': '80 Couples Sync'},
    {'id': 'songs-prayers', 'icon': '🎵', 'label': '12 Songs & Shema'},
    {'id': 'hebrew-engine', 'icon': '📸', 'label': 'Hebrew In/Out PDF'},
    {'id': 'rabbi-letters', 'icon': '✍️', 'label': '5–8+ Rabbi Letters'},
  ];

  @override
  void initState() {
    super.initState();
    final uri = Uri.base;
    if (uri.queryParameters.containsKey('module')) {
      activeModule = uri.queryParameters['module']!;
    }
    lang = html.window.localStorage['gat_lang'] ?? uri.queryParameters['lang'] ?? 'en';
  }

  void switchModule(String modId) {
    setState(() => activeModule = modId);
    html.window.history.replaceState(null, '', '/app/?module=$modId');
  }

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: lang == 'he' ? TextDirection.rtl : TextDirection.ltr,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF082548),
          foregroundColor: Colors.white,
          title: Row(
            children: [
              InkWell(
                onTap: () => html.window.location.href = (lang == 'en') ? '/' : '/$lang/',
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(color: const Color(0xFF0288E8), borderRadius: BorderRadius.circular(8)),
                  child: const Text('← Hub', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white)),
                ),
              ),
              const SizedBox(width: 12),
              const Text('Giyur Aliyah Track', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 17)),
            ],
          ),
        ),
        body: Center(child: Text('Active Module: $activeModule ($lang)')),
      ),
    );
  }
}
