## simple memo

> front : html, vanillajs
> back : flask

### 가상환경에서 flask 실행

```bash
python3 -m venv .venv
source .venv/bin/activate

# 'deactivate' to exit venv

# .venv
python3 -m pip install flask
```

### start server (dev)

```bash
python app.py
```

### mongoDB

```bash
brew tap mongodb/brew

brew install mongodb-community@4.4

# DB 서버 시작 (버전 명시 필수)
brew services start mongodb-community@4.4

# DB 서버 중지
brew services stop mongodb-community@4.4

# 현재 실행중인 프로세스 리스트
brew services list

# pymongo버전 확인 (최신 버전이 아니면 의존성 에러 발생)
pip freeze | grep pymongo
```

### pymongo
```bash
# .venv
python3 -m pip install pymongo
```