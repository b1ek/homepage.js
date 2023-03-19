#!/usr/bin/env python3

import os
import random
import base64

if (not os.path.exists('.env')):
    print('No .env file found. Please create a dotenv to proceed.');
    exit(-1);

secrets = random.SystemRandom()

key_bytes = ''.join(secrets.choices(list('abcdef1234567890'), k=32)).encode('ascii');
dotenv_text = '';

with open('.env', 'tr', encoding='utf-8') as f:
    dotenv_text = f.read();

dotenv_lines = dotenv_text.split('\n');
key_line = 0;

for i, line in enumerate(dotenv_lines):
    if (line.startswith('APP_KEY=')):
            dotenv_lines[i] = 'APP_KEY=' + base64.b64encode(key_bytes).decode('utf-8');

with open('.env', 'tw', encoding='utf-8') as f: print('\n'.join(dotenv_lines), file=f)