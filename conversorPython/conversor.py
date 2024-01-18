import csv
import json

def csv_to_json(input_csv, output_json):
    try:
        # Abrir el archivo CSV con la codificación utf-8
        with open(input_csv, 'r', encoding='utf-8') as csv_file:
            # Utilizar csv.DictReader para manejar las tildes y otros caracteres especiales
            csv_reader = csv.DictReader(csv_file)
            data = list(csv_reader)

        # Abrir el archivo JSON con la codificación utf-8
        with open(output_json, 'w', encoding='utf-8') as json_file:
            # Utilizar json.dump con ensure_ascii=False para conservar caracteres especiales
            json.dump(data, json_file, indent=4, ensure_ascii=False)

        print(f"La conversión se ha completado. Se ha creado el archivo '{output_json}'.")
    except FileNotFoundError:
        print(f"No se pudo encontrar el archivo CSV: '{input_csv}'.")
    except Exception as e:
        print(f"Se produjo un error durante la conversión: {str(e)}")

# Reemplaza 'entrada.csv' y 'salida.json' con los nombres de tus archivos CSV y JSON
csv_to_json('entrada.csv', 'salida.json')