# 🛡️ DDoS Detection System with Hive Plot Visualization

A comprehensive machine learning system for detecting Distributed Denial of Service (DDoS) attacks using advanced hive plot visualization and multi-class classification techniques.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [File Descriptions](#file-descriptions)
- [System Features](#system-features)
- [Model Performance](#model-performance)
- [Attack Types Detected](#attack-types-detected)
- [Hive Plot Explanation](#hive-plot-explanation)
- [Technical Details](#technical-details)

## 🎯 Project Overview

This system implements a complete DDoS detection pipeline that:

1. **Processes Network Traffic**: Analyzes 431,372 network flow records from the CIC-DDoS2019 dataset
2. **Feature Engineering**: Extracts and organizes 77 network features into meaningful groups
3. **Hive Plot Visualization**: Creates 3-axis visualizations showing feature relationships
4. **Machine Learning**: Trains Random Forest and Logistic Regression models for attack classification
5. **Real-time Analysis**: Provides web interface for analyzing new PCAPNG and CSV files
6. **Multi-class Detection**: Identifies 18 different types of DDoS attacks with 93.48% accuracy

## 📁 Project Structure

```
DDoS-Detection-System/
├── src/                          # Source code files
│   ├── simple_ddos_detection.py  # Main training pipeline
│   ├── ddos_gradio_app.py        # Web interface application
│   └── show_feature_groups.py    # Feature analysis utility
├── models/                       # Trained model files
│   ├── ddos_model.pkl           # Trained Random Forest model
│   ├── scaler.pkl               # Feature scaler
│   ├── label_encoder.pkl        # Attack type encoder
│   └── model_info.pkl           # Model metadata
├── outputs/                      # Generated visualizations
│   ├── hive_plot.png            # Network hive plot
│   └── model_comparison.png     # Performance comparison
├── cicddos2019_dataset.csv      # Training dataset (431,372 rows)
├── requirements.txt             # Python dependencies
├── README.md                    # This documentation
└── doc.docx                     # Additional documentation
```

## 🚀 Installation

### Prerequisites
- Python 3.7 or higher
- 4GB+ RAM (for processing large dataset)
- Internet connection (for package installation)

### Setup Steps

1. **Clone or download the project**
```bash
git clone <repository-url>
cd DDoS-Detection-System
```

2. **Install required packages**
```bash
pip install -r requirements.txt
```

3. **Verify installation**
```bash
python -c "import pandas, numpy, sklearn, gradio, scapy; print('✅ All packages installed successfully!')"
```

## 📖 Usage Guide

### Step 1: Train the Model (First Time Only)
```bash
cd src
python simple_ddos_detection.py
```
**Expected Output:**
- Processes 431,372 network records
- Trains on 10,000 samples, tests on 2,500 samples
- Generates hive plot and model comparison charts
- Saves trained models to `models/` folder
- **Runtime**: ~2-3 minutes

### Step 2: Launch Web Interface
```bash
cd src
python ddos_gradio_app.py
```
**Expected Output:**
- Starts web server on `http://localhost:8080`
- Provides public URL for external access
- Ready to analyze PCAPNG and CSV files

### Step 3: Analyze Network Traffic
1. Open web browser to `http://localhost:8080`
2. Upload PCAPNG (packet capture) or CSV (network features) file
3. Click "🔍 Analyze Network Traffic"
4. View results: attack predictions, hive plot, and risk assessment

### Optional: View Feature Analysis
```bash
cd src
python show_feature_groups.py
```
**Output**: Detailed breakdown of 77 network features organized by category

## 📄 File Descriptions

### Source Code (`src/` folder)

#### `simple_ddos_detection.py` - Main Training Pipeline
**Purpose**: Complete machine learning pipeline for DDoS detection
**Key Functions**:
- `load_and_preprocess()`: Cleans and prepares 431,372 network records
- `create_feature_groups()`: Organizes 77 features into Flow/Packet/Time categories
- `create_hive_plot()`: Generates 3-axis network visualization
- `train_models()`: Trains Random Forest and Logistic Regression models
- `save_model()`: Saves trained components for later use

**Usage**: `python simple_ddos_detection.py`
**Output**: Trained models, hive plot, performance charts

#### `ddos_gradio_app.py` - Web Interface Application
**Purpose**: Interactive web application for analyzing network traffic files
**Key Features**:
- Supports PCAPNG (Wireshark captures) and CSV files
- Real-time attack prediction and risk assessment
- Interactive hive plot with feature explanations
- Handles file format conversion and feature extraction

**Usage**: `python ddos_gradio_app.py`
**Access**: Web browser at `http://localhost:8080`

#### `show_feature_groups.py` - Feature Analysis Utility
**Purpose**: Educational tool showing network feature categorization
**Output**: Detailed explanation of 77 features used in hive plot visualization
**Usage**: `python show_feature_groups.py`

### Model Files (`models/` folder)

#### `ddos_model.pkl` - Trained Random Forest Model
- **Type**: Random Forest Classifier (100 trees)
- **Accuracy**: 93.48% on test data
- **Input**: 77 normalized network features
- **Output**: 18 attack type classifications

#### `scaler.pkl` - Feature Normalizer
- **Type**: StandardScaler (mean=0, std=1)
- **Purpose**: Normalizes network features for consistent model input
- **Applied to**: All 77 numerical features

#### `label_encoder.pkl` - Attack Type Encoder
- **Purpose**: Converts attack names to numerical labels
- **Classes**: 18 attack types (Benign + 17 DDoS variants)
- **Mapping**: 'Benign'→0, 'DrDoS_NTP'→1, 'TFTP'→2, etc.

#### `model_info.pkl` - Model Metadata
- **Contents**: Model type, accuracy, feature count, attack type list
- **Purpose**: System information for web interface

### Output Files (`outputs/` folder)

#### `hive_plot.png` - Network Hive Plot Visualization
- **Format**: High-resolution PNG (300 DPI)
- **Content**: 3-axis plot showing feature relationships
- **Axes**: Flow (red), Packet (green), Time/Flag (blue)
- **Edges**: Strong correlations (>70%) between features

#### `model_comparison.png` - Performance Comparison Chart
- **Format**: PNG chart with performance metrics
- **Content**: Accuracy, Precision, Recall, F1-Score comparison
- **Models**: Random Forest vs Logistic Regression

### Data Files

#### `cicddos2019_dataset.csv` - Training Dataset
- **Source**: CIC-DDoS2019 Dataset
- **Size**: 431,372 network flow records
- **Features**: 77 network traffic characteristics
- **Labels**: 18 attack types + benign traffic
- **Usage**: Training and validation data

## 🎨 System Features

### 🔍 Multi-format File Support
- **PCAPNG/PCAP**: Wireshark packet captures (automatic feature extraction)
- **CSV**: Pre-extracted network features (direct analysis)
- **Real-time Processing**: Instant analysis and results

### 🕸️ Hive Plot Visualization
- **3-Axis Design**: Organizes features by network layer
- **Interactive Display**: Color-coded nodes with explanations
- **Correlation Mapping**: Shows feature relationships via connecting lines

### 🤖 Machine Learning Models
- **Random Forest**: Ensemble method with 93.48% accuracy
- **Logistic Regression**: Linear classifier with 92.00% accuracy
- **Multi-class Output**: Predicts specific attack types, not just attack/benign

### 🌐 Web Interface
- **User-friendly**: Drag-and-drop file upload
- **Real-time Results**: Instant analysis and visualization
- **Risk Assessment**: Color-coded threat levels
- **Educational**: Feature explanations and system information

## 📈 Model Performance

### Training Configuration
- **Training Samples**: 10,000 (stratified sampling)
- **Testing Samples**: 2,500 (stratified sampling)
- **Feature Count**: 77 network characteristics
- **Cross-validation**: Stratified split maintaining class distribution

### Performance Metrics

| Algorithm | Accuracy | Precision | Recall | F1-Score | Use Case |
|-----------|----------|-----------|---------|----------|----------|
| **Random Forest** | **93.48%** | **93.33%** | **93.48%** | **93.26%** | **Best overall performance** |
| Logistic Regression | 92.00% | 91.88% | 92.00% | 90.83% | Fast predictions |

### Class Distribution (Training Data)
- **DrDoS_NTP**: 28.5% (2,850 samples)
- **TFTP**: 23.2% (2,322 samples)  
- **Benign**: 22.2% (2,220 samples)
- **Syn**: 11.2% (1,121 samples)
- **UDP**: 4.2% (418 samples)
- **Other attacks**: 10.7% (1,059 samples)

## 🛡️ Attack Types Detected

### DrDoS (Distributed Reflection DoS) Attacks
- **DrDoS_DNS**: DNS amplification attacks
- **DrDoS_NTP**: NTP amplification attacks  
- **DrDoS_MSSQL**: SQL Server amplification
- **DrDoS_UDP**: UDP amplification
- **DrDoS_LDAP**: LDAP amplification
- **DrDoS_SNMP**: SNMP amplification
- **DrDoS_NetBIOS**: NetBIOS amplification

### Flood Attacks
- **Syn**: TCP SYN flood attacks
- **UDP**: UDP flood attacks
- **TFTP**: TFTP-based attacks

### Application Layer Attacks
- **WebDDoS**: HTTP/HTTPS application layer attacks
- **MSSQL**: Direct database attacks
- **LDAP**: Directory service attacks

### Other Network Attacks
- **Portmap**: RPC portmapper attacks
- **NetBIOS**: Windows networking attacks
- **UDP-lag/UDPLag**: UDP-based lag attacks

### Benign Traffic
- **Benign**: Normal, legitimate network traffic

## 🕸️ Hive Plot Explanation

### Three-Axis Design
The hive plot organizes network features into three axes representing different aspects of network traffic:

#### 🔴 **Sources (Flow Features) - 14 features**
**Purpose**: Overall flow characteristics and transmission patterns
**Examples**:
- **Protocol**: Network protocol type (TCP=6, UDP=17, ICMP=1)
- **Flow Duration**: Total time of network connection
- **Flow Bytes/s**: Data transmission rate
- **Flow Packets/s**: Packet transmission rate
- **Flow IAT**: Inter-arrival time statistics

#### 🟢 **Destinations (Packet Features) - 46 features**  
**Purpose**: Detailed packet-level measurements and metrics
**Examples**:
- **Total Fwd/Bwd Packets**: Directional packet counts
- **Packet Length Stats**: Min, max, mean, std of packet sizes
- **Header Information**: Protocol header characteristics
- **Bulk Transfer**: Bytes and packets per bulk operation
- **Window Sizes**: TCP window size metrics

#### 🔵 **Intermediate (Time/Flag Features) - 17 features**
**Purpose**: Timing patterns and connection state information
**Examples**:
- **TCP Flags**: SYN, ACK, FIN, RST, PSH, URG flag counts
- **Active/Idle Times**: Connection activity statistics
- **Traffic Ratios**: Directional traffic proportions

### Correlation Visualization
- **Connecting Lines**: Show strong correlations (>70%) between features
- **Line Thickness**: Proportional to correlation strength
- **Network Insights**: Reveals how different network aspects relate to each other

## 🔧 Technical Details

### System Requirements
- **Memory**: 4GB+ RAM for dataset processing
- **Storage**: 500MB for dataset and models
- **CPU**: Multi-core recommended for Random Forest training
- **Network**: Internet connection for package installation

### Dependencies
```
pandas>=1.3.0          # Data manipulation and analysis
numpy>=1.21.0           # Numerical computing
scikit-learn>=1.0.0     # Machine learning algorithms
matplotlib>=3.4.0       # Static plotting
networkx>=2.6.0         # Graph analysis for hive plots
gradio>=4.0.0           # Web interface framework
scapy>=2.6.0            # Packet capture analysis
plotly>=5.0.0           # Interactive visualizations
```

### Feature Engineering Process
1. **Data Loading**: Read 431,372 network flow records
2. **Cleaning**: Remove duplicates (5,449 removed) and handle missing values
3. **Normalization**: Apply StandardScaler to all 77 numerical features
4. **Stratified Sampling**: Maintain attack type distribution in train/test split
5. **Feature Grouping**: Organize features by network layer for hive plot

### Model Training Process
1. **Preprocessing**: Clean and normalize network features
2. **Feature Selection**: Use all 77 available network characteristics
3. **Model Training**: Train Random Forest (100 trees) and Logistic Regression
4. **Evaluation**: Test on stratified 2,500-sample test set
5. **Model Persistence**: Save trained models, scaler, and encoder

### Web Interface Architecture
- **Backend**: Gradio framework with Python
- **File Processing**: Scapy for PCAPNG, Pandas for CSV
- **Model Loading**: Pickle-based model persistence
- **Visualization**: Matplotlib and Plotly for charts
- **Deployment**: Local server with optional public sharing

---

## 🚀 Getting Started

1. **Install dependencies**: `pip install -r requirements.txt`
2. **Train models**: `cd src && python simple_ddos_detection.py`
3. **Launch web app**: `cd src && python ddos_gradio_app.py`
4. **Open browser**: Navigate to `http://localhost:8080`
5. **Upload files**: Test with PCAPNG or CSV network traffic files

**Ready to detect DDoS attacks with advanced machine learning and visualization! 🛡️**