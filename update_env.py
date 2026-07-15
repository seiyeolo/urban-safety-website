import re

path = ".env.local"
with open(path, "r", encoding="utf-8") as f:
    env_data = f.read()

env_data = re.sub(
    r'NEXT_PUBLIC_SUPABASE_URL=.*',
    'NEXT_PUBLIC_SUPABASE_URL=https://sugredndujsstsdxmepe.supabase.co',
    env_data
)
env_data = re.sub(
    r'NEXT_PUBLIC_SUPABASE_ANON_KEY=.*',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_IQ7rk2ySjnKbVNj4c0mWIw_1qnz6-c-',
    env_data
)

with open(path, "w", encoding="utf-8") as f:
    f.write(env_data)

print("✅ .env.local 성공적으로 업데이트 완료!")
