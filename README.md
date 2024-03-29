# NASSE

## Installation
### Python
* You must install `python3`, follow this link [Python3 Installation](https://www.python.org/downloads/)
* You must have `pip`


### Requirements
* Just run the bash file ```bash installation.sh```


## Config
* Copy the `KaDo.csv` file provided with the project into `data` folder
* With Jupyter: run this command ```jupyter-lab``` and choose the myenv in Kernel in the top right corner
* In VS Code: Open the project and choose the the `myenv` in Kernel in the top right corner, and restart


## Usage
* First generate RFM data by opening `RFM_Segmentation.ipynb` and run it.
* Second generate important data (best sells, best univers ...) by opening `visu-explo-data.ipynb`
and run it.
* Finally open `user_recommendation.ipynb` and run it, give a `client id` and here your are.

## Docs
You can find more details of our project on the readme website `https://nasse.readme.io/reference/authentification`
You can find the swagger api doc from : `http://51.178.44.20:2436/api-docs/#/`

## Deploy de API

The API is hosted on a dedicated server and the deployment have been automatised. It work as follow :

On the repository there is a prod branch that trigger a web hook using GitHub action when the branch receive a commit.

The web hook then hit our dedicated server. As the API is using docker container the hook is configured to down the container then update the content and restart it.
