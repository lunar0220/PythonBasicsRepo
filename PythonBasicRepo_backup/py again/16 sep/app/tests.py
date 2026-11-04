import pytest
from fastapi.testclient import TestClient

from main import app, fake_db

@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client
    fake_db.clear()
    
def test_read_roads(client):
    response = client.get("/")
    
    assert response
    assert response.json() == {"message": "Hello World"}

