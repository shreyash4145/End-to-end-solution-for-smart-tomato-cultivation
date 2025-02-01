import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import Navbar from "../../Common/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MqttDashboard = () => {
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [chartData, setChartData] = useState({
    labels: [], // Time or data labels
    datasets: [
      {
        label: "Sensor Data", // Label for the dataset
        data: [], // The actual data values to plot
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area under the line color
        fill: true, // Whether to fill the area under the line
      },
    ],
  });

  useEffect(() => {
    const brokerUrl = "wss://broker.hivemq.com:8884/mqtt";
    const options = {
      clean: true,
      connectTimeout: 4000,
      clientId: "react_mqtt_client_" + Math.random().toString(16).substr(2, 8),
    };

    const client = mqtt.connect(brokerUrl, options);

    client.on("connect", () => {
      setConnectionStatus("Connected to MQTT Broker");
      console.log("Connected to MQTT Broker");
      client.subscribe("plants", (err) => {
        if (!err) {
          console.log("Subscribed to topic: plants");
        }
      });
    });

    // Handle incoming messages
    client.on("message", (topic, payload) => {
      try {
        const newMessage = JSON.parse(payload.toString()); // Parse JSON
        console.log("Received message:", newMessage); // Log the parsed message

        // Assuming newMessage contains 'sensorValue' and 'timestamp'
        const sensorValue = newMessage.sensorValue; // Replace with actual property
        const timestamp = newMessage.timestamp; // Replace with actual property

        // Debugging log to ensure sensorValue and timestamp are correct
        console.log("Sensor Value:", sensorValue, "Timestamp:", timestamp);

        // Ensure the sensorValue is a valid number
        if (!isNaN(sensorValue) && timestamp) {
          // Update chart data
          setChartData((prevData) => {
            const updatedLabels = [...prevData.labels, timestamp];
            const updatedData = [...prevData.datasets[0].data, sensorValue];

            return {
              ...prevData,
              labels: updatedLabels,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: updatedData,
                },
              ],
            };
          });
        } else {
          console.error("Invalid data received:", newMessage);
        }
      } catch (error) {
        console.error("Invalid JSON message:", payload.toString());
        setConnectionStatus("Invalid JSON format");
      }
    });

    // Handle errors
    client.on("error", (err) => {
      console.error("Connection error:", err);
      setConnectionStatus("Connection error");
    });

    // Handle disconnection on unmount
    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4">
            MQTT Data Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-6">{connectionStatus}</p>
        </div>

        {/* Message Display Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Received Message:</h2>
          <p className="text-gray-800">{connectionStatus}</p>
        </div>

        {/* Chart Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Sensor Data Over Time",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Timestamp",
                    color: "#4b5563",
                    font: { size: 14 },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Sensor Value",
                    color: "#4b5563",
                    font: { size: 14 },
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            }}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default MqttDashboard;
