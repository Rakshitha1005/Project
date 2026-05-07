"""
Show the exact features in each group for the hive plot
"""

import pandas as pd
from simple_ddos_detection import SimpleDDoSDetection

def show_feature_groups():
    print("="*60)
    print("FEATURE GROUPS FOR HIVE PLOT")
    print("="*60)
    
    # Load the dataset to get feature names
    df = pd.read_csv('../cicddos2019_dataset.csv')
    
    # Remove unnamed columns and target columns
    feature_cols = [col for col in df.columns if 'Unnamed' not in col and col not in ['Label', 'Class']]
    
    print(f"Total features available: {len(feature_cols)}")
    print("\nAll features:")
    for i, feature in enumerate(feature_cols, 1):
        print(f"{i:2d}. {feature}")
    
    # Create feature groups using the same logic as in the main script
    flow_features = []
    packet_features = []
    time_flag_features = []
    
    for feature in feature_cols:
        if any(keyword in feature.lower() for keyword in ['flow', 'duration', 'protocol', 'bytes/s', 'packets/s']):
            flow_features.append(feature)
        elif any(keyword in feature.lower() for keyword in ['fwd', 'bwd', 'packet', 'length', 'total']):
            packet_features.append(feature)
        else:
            time_flag_features.append(feature)
    
    print("\n" + "="*60)
    print("HIVE PLOT AXIS ASSIGNMENTS")
    print("="*60)
    
    print(f"\n🔴 FLOW FEATURES (Sources) - {len(flow_features)} features:")
    for i, feature in enumerate(flow_features, 1):
        print(f"  {i:2d}. {feature}")
    
    print(f"\n🟢 PACKET FEATURES (Destinations) - {len(packet_features)} features:")
    for i, feature in enumerate(packet_features, 1):
        print(f"  {i:2d}. {feature}")
    
    print(f"\n🔵 TIME/FLAG FEATURES (Intermediate) - {len(time_flag_features)} features:")
    for i, feature in enumerate(time_flag_features, 1):
        print(f"  {i:2d}. {feature}")
    
    print("\n" + "="*60)
    print("FEATURE DESCRIPTIONS")
    print("="*60)
    
    print("\n🔴 FLOW FEATURES (Sources):")
    print("   These represent overall flow characteristics:")
    for feature in flow_features:
        if 'Protocol' in feature:
            print(f"   • {feature}: Network protocol type (TCP=6, UDP=17, etc.)")
        elif 'Duration' in feature:
            print(f"   • {feature}: How long the network flow lasted")
        elif 'Bytes/s' in feature:
            print(f"   • {feature}: Data transfer rate in bytes per second")
        elif 'Packets/s' in feature:
            print(f"   • {feature}: Packet transmission rate per second")
        else:
            print(f"   • {feature}: Flow-related metric")
    
    print("\n🟢 PACKET FEATURES (Destinations):")
    print("   These represent packet-level characteristics:")
    for feature in packet_features[:10]:  # Show first 10
        if 'Fwd' in feature:
            print(f"   • {feature}: Forward direction packet metric")
        elif 'Bwd' in feature:
            print(f"   • {feature}: Backward direction packet metric")
        elif 'Total' in feature:
            print(f"   • {feature}: Total count or sum metric")
        elif 'Length' in feature:
            print(f"   • {feature}: Packet size measurement")
        else:
            print(f"   • {feature}: Packet-related metric")
    if len(packet_features) > 10:
        print(f"   ... and {len(packet_features) - 10} more packet features")
    
    print("\n🔵 TIME/FLAG FEATURES (Intermediate):")
    print("   These represent timing and TCP flag characteristics:")
    for feature in time_flag_features[:10]:  # Show first 10
        if 'IAT' in feature:
            print(f"   • {feature}: Inter-Arrival Time between packets")
        elif 'Flag' in feature:
            print(f"   • {feature}: TCP flag count (SYN, ACK, FIN, etc.)")
        elif 'Active' in feature:
            print(f"   • {feature}: Active connection time metric")
        elif 'Idle' in feature:
            print(f"   • {feature}: Idle connection time metric")
        elif 'Win' in feature:
            print(f"   • {feature}: TCP window size metric")
        else:
            print(f"   • {feature}: Timing or connection state metric")
    if len(time_flag_features) > 10:
        print(f"   ... and {len(time_flag_features) - 10} more time/flag features")
    
    print("\n" + "="*60)
    print("HIVE PLOT EXPLANATION")
    print("="*60)
    print("""
The hive plot organizes features into three axes representing different aspects of network traffic:

🔴 SOURCES (Flow Features): 
   - Represent the overall characteristics of network flows
   - Include protocol type, duration, and transmission rates
   - These are the "source" of network behavior patterns

🟢 DESTINATIONS (Packet Features):
   - Represent detailed packet-level measurements  
   - Include packet counts, sizes, and directional metrics
   - These are the "destinations" where flow characteristics manifest

🔵 INTERMEDIATE (Time/Flag Features):
   - Represent timing patterns and connection states
   - Include inter-arrival times, TCP flags, and connection metrics
   - These are "intermediate" behaviors that connect sources to destinations

Edges in the hive plot show strong correlations (>0.7) between features,
revealing how different aspects of network traffic are related.
""")

if __name__ == "__main__":
    show_feature_groups()