# Registry

_Author: Caio Coelho_

The registry contains the list of services available.

**Backend Endpoints**

All POST requests must pass a valid `Service` object.
All POST request must use a API-Key authorization. Use key `API-Key` and value `<the_key>`. (Key must match environment variable.)

- GET `services`: Get list of active available services
- POST `service/add`: Add new service
- DELETE `service/remove`: Remove service
- POST `service/activate`: Activate service
- POST `service/deactivate`: Deactivate service

**Service Model**

    Service {
        displayName: string;
        path: string;
        active: boolean;
    }

**Environment Variables**

The following environment variables are required

- `DATABASE_DIR` the directory where the database file will be stored (ending with a `/`)
- `API_KEY` the key that will be required from POST endpoints. Only requests that receive this key will be processed.
