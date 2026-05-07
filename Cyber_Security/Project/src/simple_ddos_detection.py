"""
Simple DDoS Detection System
Following the exact workflow:
1. Load cicddos2019_dataset.csv
2. Preprocessing + Normalization
3. Feature Groups for Hive Plot
4. Train ML Models (RF, SVM, Gradient Boost)
5. Comparison Table
6. Streamlit Web Interface
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import networkx as nx
import warnings
warnings.filterwarnings('ignore')

class SimpleDDoSDetection:
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.models = {}
        self.results = {}
        
    def load_and_preprocess(self, file_path):
        """Step 1: Load and preprocess the dataset - ALL 431,372 rows"""
        print("Step 1: Loading cicddos2019_dataset.csv...")
        print("Loading ALL rows (431,372) for complete analysis...")
        
        # Load complete dataset
        df = pd.read_csv(file_path)
        print(f"Original dataset shape: {df.shape}")
        print(f"Total rows loaded: {df.shape[0]:,}")
        
        # Remove unnamed columns
        df = df.drop(columns=[col for col in df.columns if 'Unnamed' in col], errors='ignore')
        
        # Handle missing values
        print("Handling missing values...")
        missing_before = df.isnull().sum().sum()
        df = df.dropna()
        missing_after = df.isnull().sum().sum()
        print(f"Missing values removed: {missing_before}")
        
        # Remove duplicates
        print("Removing duplicates...")
        rows_before = len(df)
        df = df.drop_duplicates()
        rows_after = len(df)
        print(f"Duplicate rows removed: {rows_before - rows_after:,}")
        
        print(f"Final dataset shape: {df.shape}")
        print(f"Final rows for analysis: {df.shape[0]:,}")
        
        # Encode labels
        if 'Label' in df.columns:
            df['Label_encoded'] = self.label_encoder.fit_transform(df['Label'])
            print(f"Attack types detected: {len(self.label_encoder.classes_)}")
            print("Attack types:", list(self.label_encoder.classes_))
        
        # Binary classification
        if 'Class' in df.columns:
            df['Class_encoded'] = df['Class'].map({'Benign': 0, 'Attack': 1})
            print("\nClass distribution:")
            class_counts = df['Class'].value_counts()
            print(f"Benign: {class_counts.get('Benign', 0):,}")
            print(f"Attack: {class_counts.get('Attack', 0):,}")
            print(f"Attack ratio: {(class_counts.get('Attack', 0) / len(df)):.2%}")
        
        return df
    
    def normalize_features(self, X_train, X_test):
        """Step 2: Normalize features using StandardScaler"""
        print("Step 2: Normalizing features using StandardScaler...")
        print(f"Features to normalize: {X_train.shape[1]}")
        
        # Fit StandardScaler on training data and transform both sets
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        print("StandardScaler applied successfully")
        print(f"Training set shape after scaling: {X_train_scaled.shape}")
        print(f"Testing set shape after scaling: {X_test_scaled.shape}")
        
        return X_train_scaled, X_test_scaled
    
    def create_feature_groups(self, features):
        """Step 3: Create feature groups for hive plot"""
        print("Step 3: Creating feature groups for hive plot...")
        
        # Define feature groups
        flow_features = []
        packet_features = []
        time_flag_features = []
        
        for feature in features:
            if any(keyword in feature.lower() for keyword in ['flow', 'duration', 'protocol', 'bytes/s', 'packets/s']):
                flow_features.append(feature)
            elif any(keyword in feature.lower() for keyword in ['fwd', 'bwd', 'packet', 'length', 'total']):
                packet_features.append(feature)
            else:
                time_flag_features.append(feature)
        
        print(f"Flow features: {len(flow_features)}")
        print(f"Packet features: {len(packet_features)}")
        print(f"Time/Flag features: {len(time_flag_features)}")
        
        return {
            'flow': flow_features,
            'packet': packet_features,
            'time_flag': time_flag_features
        }
    
    def create_hive_plot(self, X_train, feature_groups):
        """Step 4: Create hive plot visualization"""
        print("Step 4: Creating hive plot...")
        
        # Calculate correlation matrix
        corr_matrix = X_train.corr()
        
        # Create graph
        G = nx.Graph()
        
        # Add nodes
        for feature in X_train.columns:
            G.add_node(feature)
        
        # Add edges (strong correlations)
        threshold = 0.7
        edges = []
        for i, feature1 in enumerate(X_train.columns):
            for j, feature2 in enumerate(X_train.columns[i+1:], i+1):
                corr_value = abs(corr_matrix.loc[feature1, feature2])
                if corr_value >= threshold:
                    G.add_edge(feature1, feature2, weight=corr_value)
                    edges.append((feature1, feature2, corr_value))
        
        # Create hive plot
        plt.figure(figsize=(12, 10))
        
        # Define three axes (120 degrees apart)
        angles = [0, 2*np.pi/3, 4*np.pi/3]
        
        # Draw axes
        for angle in angles:
            x_end = 8 * np.cos(angle)
            y_end = 8 * np.sin(angle)
            plt.plot([0, x_end], [0, y_end], 'k-', linewidth=2, alpha=0.3)
        
        # Position features on axes
        positions = {}
        colors = ['red', 'green', 'blue']
        labels = ['Flow Features', 'Packet Features', 'Time/Flag Features']
        
        for axis_idx, (group_name, features) in enumerate(feature_groups.items()):
            angle = angles[axis_idx]
            color = colors[axis_idx]
            
            for i, feature in enumerate(features[:8]):  # Limit to 8 features per axis
                radius = (i + 1) * 1.0
                x = radius * np.cos(angle)
                y = radius * np.sin(angle)
                positions[feature] = (x, y)
                
                plt.scatter(x, y, c=color, s=100, alpha=0.8, edgecolors='black')
        
        # Draw edges
        for feature1, feature2, weight in edges:
            if feature1 in positions and feature2 in positions:
                x1, y1 = positions[feature1]
                x2, y2 = positions[feature2]
                plt.plot([x1, x2], [y1, y2], 'gray', alpha=0.6, linewidth=weight*2)
        
        # Add labels
        axis_labels = ['Flow Features\n(Sources)', 'Packet Features\n(Destinations)', 'Time/Flag Features\n(Intermediate)']
        label_positions = [(7, 1), (-3.5, 6), (-3.5, -6)]
        
        for label, (lx, ly) in zip(axis_labels, label_positions):
            plt.text(lx, ly, label, fontsize=12, fontweight='bold', ha='center', va='center')
        
        # Legend
        legend_elements = [
            plt.scatter([], [], c='red', s=100, label='Sources'),
            plt.scatter([], [], c='green', s=100, label='Destinations'),
            plt.scatter([], [], c='blue', s=100, label='Intermediate')
        ]
        plt.legend(handles=legend_elements, loc='upper right')
        
        plt.title('Training Data - Network Hive Plot', fontsize=16, fontweight='bold')
        plt.axis('equal')
        plt.axis('off')
        plt.tight_layout()
        
        # Save the hive plot
        plt.savefig('../outputs/hive_plot.png', dpi=300, bbox_inches='tight')
        print("Hive plot saved as '../outputs/hive_plot.png'")
        plt.show()
        
        return G, edges
    
    def train_models(self, X_train, X_test, y_train, y_test):
        """Step 5: Train ML models (Random Forest, Logistic Regression)"""
        print("Step 5: Training ML models on complete dataset...")
        print(f"Training on {len(X_train):,} samples")
        print(f"Testing on {len(X_test):,} samples")
        
        # Define models with optimized parameters
        self.models = {
            'Random Forest': RandomForestClassifier(
                n_estimators=100, 
                random_state=42,
                n_jobs=-1,  # Use all CPU cores
                max_depth=20,  # Limit depth for efficiency
                min_samples_split=10
            ),
            'Logistic Regression': LogisticRegression(
                random_state=42,
                max_iter=1000,  # Increase iterations for convergence
                n_jobs=-1,  # Use all CPU cores
                solver='lbfgs'  # Good solver for multiclass
            )
        }
        
        # Train and evaluate each model
        for name, model in self.models.items():
            print(f"\nTraining {name}...")
            
            # Train model
            model.fit(X_train, y_train)
            print(f"  - Training completed")
            
            # Make predictions
            print(f"  - Making predictions on {len(X_test):,} test samples...")
            y_pred = model.predict(X_test)
            print(f"  - Predictions completed")
            
            # Calculate metrics
            accuracy = accuracy_score(y_test, y_pred)
            
            # Store results
            self.results[name] = {
                'model': model,
                'accuracy': accuracy,
                'predictions': y_pred,
                'classification_report': classification_report(y_test, y_pred, output_dict=True, zero_division=0)
            }
            
            print(f"  - {name} Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")
        
        return self.results
    
    def create_comparison_table(self):
        """Step 6: Create comprehensive comparison table"""
        print("Step 6: Creating comprehensive comparison table...")
        
        comparison_data = []
        for name, result in self.results.items():
            report = result['classification_report']
            comparison_data.append({
                'Algorithm': name,
                'Accuracy': result['accuracy'],
                'Precision': report['weighted avg']['precision'],
                'Recall': report['weighted avg']['recall'],
                'F1-Score': report['weighted avg']['f1-score']
            })
        
        comparison_df = pd.DataFrame(comparison_data)
        comparison_df = comparison_df.round(4)
        
        print("\nModel Comparison Table:")
        print("="*60)
        print(comparison_df.to_string(index=False))
        
        # Find best model
        best_model_idx = comparison_df['Accuracy'].idxmax()
        best_model = comparison_df.iloc[best_model_idx]
        print(f"\n🏆 BEST MODEL: {best_model['Algorithm']}")
        print(f"   Accuracy: {best_model['Accuracy']:.4f} ({best_model['Accuracy']*100:.2f}%)")
        print(f"   Precision: {best_model['Precision']:.4f}")
        print(f"   Recall: {best_model['Recall']:.4f}")
        print(f"   F1-Score: {best_model['F1-Score']:.4f}")
        
        # Visualize comparison
        plt.figure(figsize=(12, 8))
        
        # Performance metrics comparison
        metrics = ['Accuracy', 'Precision', 'Recall', 'F1-Score']
        x = np.arange(len(comparison_df))
        width = 0.2
        colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
        
        for i, metric in enumerate(metrics):
            plt.bar(x + i*width, comparison_df[metric], width, label=metric, color=colors[i])
        
        plt.xlabel('Algorithms')
        plt.ylabel('Score')
        plt.title('Model Performance Comparison - Multi-class Attack Classification')
        plt.xticks(x + width*1.5, comparison_df['Algorithm'])
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.ylim(0, 1.1)
        
        # Add value labels on bars
        for i, metric in enumerate(metrics):
            for j, value in enumerate(comparison_df[metric]):
                plt.text(j + i*width, value + 0.01, f'{value:.3f}', 
                        ha='center', va='bottom', fontsize=8)
        
        plt.tight_layout()
        plt.savefig('../outputs/model_comparison.png', dpi=300, bbox_inches='tight')
        print("Model comparison chart saved as '../outputs/model_comparison.png'")
        plt.show()
        
        return comparison_df
    
    def run_complete_pipeline(self, dataset_path):
        """Run the complete pipeline"""
        print("="*60)
        print("DDoS Detection System - Complete Pipeline")
        print("="*60)
        
        # Step 1: Load and preprocess
        df = self.load_and_preprocess(dataset_path)
        
        # Prepare features and target - Use Label for multi-class classification
        feature_cols = [col for col in df.columns if col not in ['Label', 'Label_encoded', 'Class', 'Class_encoded']]
        X = df[feature_cols]
        y = df['Label_encoded']  # Use Label_encoded for multi-class attack type classification
        
        print(f"\nTarget variable (Label) distribution:")
        label_counts = df['Label'].value_counts()
        for label, count in label_counts.items():
            print(f"  {label}: {count:,} ({count/len(df)*100:.1f}%)")
        
        # Use specific sample sizes: 10,000 for training, 2,500 for testing
        print(f"\nUsing fixed sample sizes:")
        print(f"Training samples: 10,000")
        print(f"Testing samples: 2,500")
        print(f"Total samples to use: 12,500 out of {len(X):,}")
        
        # First, sample 12,500 rows stratified by class
        if len(X) >= 12500:
            X_sample, _, y_sample, _ = train_test_split(
                X, y, 
                train_size=12500,
                random_state=42, 
                stratify=y
            )
        else:
            print(f"Warning: Dataset has only {len(X):,} samples, using all available data")
            X_sample, y_sample = X, y
        
        # Now split the sampled data: 10k training, 2.5k testing
        train_size = min(10000, int(len(X_sample) * 4/5))
        test_size = min(2500, len(X_sample) - train_size)
        
        X_train, X_test, y_train, y_test = train_test_split(
            X_sample, y_sample,
            train_size=train_size,
            test_size=test_size,
            random_state=42,
            stratify=y_sample
        )
        
        print(f"Actual training samples: {len(X_train):,}")
        print(f"Actual testing samples: {len(X_test):,}")
        
        # Show class distribution in splits using label encoder
        print(f"\nTraining set attack type distribution:")
        train_label_names = self.label_encoder.inverse_transform(y_train)
        train_label_dist = pd.Series(train_label_names).value_counts()
        for label, count in train_label_dist.head(10).items():
            print(f"  {label}: {count:,} ({count/len(y_train)*100:.1f}%)")
        
        print(f"\nTesting set attack type distribution:")
        test_label_names = self.label_encoder.inverse_transform(y_test)
        test_label_dist = pd.Series(test_label_names).value_counts()
        for label, count in test_label_dist.head(10).items():
            print(f"  {label}: {count:,} ({count/len(y_test)*100:.1f}%)")
        
        # Step 2: Normalize
        X_train_scaled, X_test_scaled = self.normalize_features(X_train, X_test)
        X_train_df = pd.DataFrame(X_train_scaled, columns=X_train.columns)
        X_test_df = pd.DataFrame(X_test_scaled, columns=X_test.columns)
        
        # Step 3: Feature groups
        feature_groups = self.create_feature_groups(X_train.columns[:20])  # Use top 20 features
        
        # Step 4: Hive plot (use sample for visualization to avoid memory issues)
        print(f"\nCreating hive plot visualization...")
        sample_size = min(10000, len(X_train_df))  # Use sample for visualization
        X_train_sample = X_train_df.sample(sample_size, random_state=42)
        print(f"Using {sample_size:,} samples for hive plot visualization")
        G, edges = self.create_hive_plot(X_train_sample.iloc[:, :20], feature_groups)
        
        # Step 5: Train models
        model_results = self.train_models(X_train_scaled, X_test_scaled, y_train, y_test)
        
        # Step 6: Comparison table
        comparison_df = self.create_comparison_table()
        
        print("\n" + "="*60)
        print("Pipeline completed successfully!")
        print("="*60)
        
        # Save the trained model and components
        self.save_model()
        
        return {
            'data': df,
            'feature_groups': feature_groups,
            'graph': G,
            'model_results': model_results,
            'comparison': comparison_df,
            'scaler': self.scaler,
            'label_encoder': self.label_encoder
        }
    
    def save_model(self):
        """Save the trained model and preprocessing components"""
        import pickle
        
        print("Saving trained model and components...")
        
        # Save the best model (Random Forest)
        best_model = self.models['Random Forest']
        with open('../models/ddos_model.pkl', 'wb') as f:
            pickle.dump(best_model, f)
        
        # Save the scaler
        with open('../models/scaler.pkl', 'wb') as f:
            pickle.dump(self.scaler, f)
        
        # Save the label encoder
        with open('../models/label_encoder.pkl', 'wb') as f:
            pickle.dump(self.label_encoder, f)
        
        # Save model info
        model_info = {
            'model_type': 'Random Forest',
            'accuracy': self.results['Random Forest']['accuracy'],
            'feature_count': 77,
            'attack_types': list(self.label_encoder.classes_)
        }
        
        with open('../models/model_info.pkl', 'wb') as f:
            pickle.dump(model_info, f)
        
        print("✅ Model saved successfully!")
        print("Files saved to models/ folder: ddos_model.pkl, scaler.pkl, label_encoder.pkl, model_info.pkl")

# Main execution
if __name__ == "__main__":
    # Initialize system
    ddos_system = SimpleDDoSDetection()
    
    # Run complete pipeline
    results = ddos_system.run_complete_pipeline('../cicddos2019_dataset.csv')
    
    print("\nSystem ready for Streamlit web interface!")
    print("Run: streamlit run streamlit_app.py")