from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import networkx as nx
import matplotlib.pyplot as plt
import osmnx as ox
import json
def search(start_city, end_city):
    ox.settings.max_query_area_size = 1e9
    region = "Bejaia, DZ"
    graph = ox.graph_from_place(region, network_type='drive')
    ox.save_graphml(graph,'map.graphml')
    fig, ax= ox.plot_graph(graph, show=False)
    graph = ox.load_graphml('map.graphml')
    start_node = ox.distance.nearest_nodes(graph, start_city[1], start_city[0])
    end_node = ox.distance.nearest_nodes(graph, end_city[1], end_city[0])
    shortest_path = nx.astar_path(graph, start_node, end_node, weight='length')
    shortest_path_coords = [(graph.nodes[node]['y'], graph.nodes[node]['x']) for node in shortest_path]
    fig, ax = ox.plot_graph_route(graph, shortest_path, route_color='b', route_linewidth=1, node_size=0, show=False, close=False) 
    ax.scatter(start_city[1], start_city[0], c='g', s=100, zorder=2)
    ax.scatter(end_city[1], end_city[0], c='r', s=100, zorder=2)
    
    try:
        with open('/home/lakhdari/search_map/front/src/output.json', 'w') as f:
            json.dump(shortest_path_coords, f)
    except Exception as e:
        print(f"Error writing to file: {e}")
    
    return shortest_path_coords

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)
class Map(Resource):
    def post(self):
        data = request.get_json()
        start_city = data['start_city'][0]
        end_city = data['end_city'][0]
        shortest_path_coords = search(start_city, end_city)
        return jsonify({"shortest_path_coords": shortest_path_coords, 'METHOD': 'POST'})

    def get(self):
        return jsonify({"message": "GET request received"})

api.add_resource(Map, '/')

if __name__=='__main__':
    app.run(debug=True)