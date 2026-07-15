import os, re

css_path = "app/globals.css"
with open(css_path, "r", encoding="utf-8") as f: css = f.read()

css = re.sub(r'\.page-hero\s*\{[^}]+\}', '.page-hero {\n  background: linear-gradient(180deg, #0d1829 0%, #1a3a5c 100%);\n  color: #ffffff;\n  padding: 120px 24px 100px;\n  text-align: center;\n  border-bottom: 1px solid rgba(255,255,255,0.1);\n}', css)
css = re.sub(r'\.card\s*\{[^}]+\}', '.card {\n  background: #ffffff;\n  border: 1px solid rgba(229, 231, 235, 0.6);\n  border-radius: 24px;\n  padding: 40px;\n  box-shadow: 0 4px 24px -4px rgba(26, 58, 92, 0.04), 0 0 2px rgba(26, 58, 92, 0.04);\n  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}', css)
css = re.sub(r'\.card:hover\s*\{[^}]+\}', '.card:hover {\n  box-shadow: 0 20px 40px -8px rgba(26, 58, 92, 0.12), 0 0 4px rgba(26, 58, 92, 0.04);\n  transform: translateY(-4px);\n}', css)
css += "\n/* Impeccable Custom Utilities */\n.shadow-soft { box-shadow: 0 4px 20px -2px rgba(26, 58, 92, 0.08), 0 0 3px rgba(26, 58, 92, 0.04); }\n.shadow-float { box-shadow: 0 12px 40px -4px rgba(26, 58, 92, 0.12), 0 0 4px rgba(26, 58, 92, 0.04); }\n"

with open(css_path, "w", encoding="utf-8") as f: f.write(css)
print("CSS updated successfully.")
