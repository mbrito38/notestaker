# **Notestaker Backend**

The Notestaker backend is built using **Django** and **Django REST Framework (DRF)**. It provides a secure API for user authentication, daily notes management, and audio recording features. This project is containerized using **Docker** and uses **PostgreSQL** as the database.

---

## **Installation**

Follow these steps to set up the project locally or with Docker:

---

### **Using Docker**

### **1. Clone the Repository**

```bash
git clone https://github.com/robbieusdev/notetaker.git
cd notestaker
```

### **2. Build and Start the Docker Containers**

1. Build the Docker containers:
   ```bash
   docker-compose build
   ```

2. Start the containers:
   ```bash
   docker-compose up
   ```

### **3. Run Migrations**

Run the following command to apply database migrations inside the `web` container:

```bash
docker-compose exec web python manage.py migrate
```

### **4. Create a Superuser**

Create an admin user for accessing the Django admin interface:

```bash
docker-compose exec web python manage.py createsuperuser
```

### **5. Access the Application**

- The app will be accessible at [http://localhost:8000](http://localhost:8000).
- Use the Django admin interface at [http://localhost:8000/admin](http://localhost:8000/admin).

---

### **Without Docker (Local Setup)**

### **1. Set Up a Virtual Environment**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### **2. Install Dependencies**

```bash
pip install -r requirements.txt
```

### **3. Configure the Database**

Update the `DATABASES` configuration in `notesproject/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'notestaker_db',
        'USER': 'postgres',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### **4. Apply Migrations**

```bash
python manage.py makemigrations
python manage.py migrate
```

### **5. Create a Superuser**

```bash
python manage.py createsuperuser
```

### **6. Run the Development Server**

```bash
python manage.py runserver
```

---

## **API Endpoints**

### **Authentication**

- **Signup**: `POST /api/accounts/signup/`
- **Login (Token Obtain)**: `POST /api/token/`
- **Token Refresh**: `POST /api/token/refresh/`

### **Notes Management**

- **Get All Notes**: `GET /api/notes/`
- **Create Note**: `POST /api/notes/`
- **Update Note**: `PUT /api/notes/<note_id>/`
- **Delete Note**: `DELETE /api/notes/<note_id>/`

---

## **File Structure**

```
notestaker/
├── notesproject/         # Main project folder
│   ├── settings.py       # Django settings
│   ├── urls.py           # Root URLs
├── accounts/             # Accounts app for user management
│   ├── serializers.py    # Signup serializer
│   ├── views.py          # Signup view
│   ├── urls.py           # Accounts URLs
│   ├── test_cases/       # Test cases for accounts
├── notes/                # Notes app for note management
│   ├── serializers.py    # Notes serializers
│   ├── views.py          # Notes views
│   ├── urls.py           # Notes URLs
│   ├── test_cases/       # Test cases for notes
├── manage.py             # Django entry point
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Dockerfile for the web service
├── requirements.txt      # Python dependencies
└── venv/                 # Virtual environment (local only)
```

---

## **Testing**

### **Run Tests**

#### **With Docker**

Run tests inside the Docker container:

```bash
docker-compose exec web python manage.py test accounts.test_cases
docker-compose exec web python manage.py test notes.test_cases
```

Run tests with coverage:

```bash
docker-compose exec web coverage run --source='.' manage.py test accounts.test_cases notes.test_cases
docker-compose exec web coverage report -m
```

Generate an HTML coverage report:

```bash
docker-compose exec web coverage html
```

Open the report:

```bash
open htmlcov/index.html  # MacOS
xdg-open htmlcov/index.html  # Linux
start htmlcov/index.html  # Windows
```

#### **Without Docker (Local Setup)**

Run tests locally:

```bash
python manage.py test accounts.test_cases
python manage.py test notes.test_cases
```

Run tests with coverage locally:

```bash
coverage run --source='.' manage.py test accounts.test_cases notes.test_cases
coverage report -m
coverage html
```

---

### Final commands

```bash
docker-compose exec web coverage run --source='accounts,notes' manage.py test accounts.test_cases notes.test_cases
docker-compose exec web coverage report -m
docker-compose exec web coverage html


```