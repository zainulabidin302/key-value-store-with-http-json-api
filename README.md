# Arbitrary depth json data store
## Key Value Data Store With HTTP API
## RemoteStorage on the server with no schema enforcement 
In this experiment, I am trying to build an HTTP API where I can store 
data in heirarchical structure with arbitrary depth. 

# Saving Data
    `POST` `/store/path/to/store` defines the endpoint where a user can send a payload 
    with any path to store a string payload


# Retrieving Data
    `GET` `/store/path/to/store` defines the endpoint where a user can retrieve a payload 
    stored at the specific endpoint.
