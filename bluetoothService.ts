
interface BluetoothGATTCharacteristic {
  startNotifications(): Promise<void>;
  addEventListener(type: string, listener: (event: { target: { value: DataView } }) => void): void;
}

interface BluetoothGATTService {
  getCharacteristic(uuid: string): Promise<BluetoothGATTCharacteristic>;
}

interface BluetoothGATTServer {
  /**
   * Added connect method to correctly type the Web Bluetooth GATT connection sequence.
   * This resolves the error on line 44.
   */
  connect(): Promise<BluetoothGATTServer>;
  getPrimaryService(uuid: string): Promise<BluetoothGATTService>;
  connected: boolean;
  disconnect(): void;
}

interface BluetoothDevice {
  gatt?: BluetoothGATTServer;
  name?: string;
}

export class BluetoothService {
  private device: BluetoothDevice | null = null;
  private server: BluetoothGATTServer | null = null;
  private characteristic: BluetoothGATTCharacteristic | null = null;

  async requestWatchConnection(onHeartRateUpdate: (hr: number) => void): Promise<string> {
    try {
      const heartRateServiceUuid = 'heart_rate';
      const heartRateCharacteristicUuid = 'heart_rate_measurement';

      const navigatorObj = globalThis.navigator as unknown as { bluetooth: { requestDevice: (config: object) => Promise<BluetoothDevice> } };
      
      this.device = await navigatorObj.bluetooth.requestDevice({
        filters: [{ services: [heartRateServiceUuid] }],
        optionalServices: [
          'battery_service', 
          'device_information', 
          'generic_access',
          'heart_rate'
        ]
      });

      // Establish connection to the GATT server
      this.server = await this.device.gatt?.connect() || null;
      if (!this.server) throw new Error("GATT Server connection failed");

      const service = await this.server.getPrimaryService(heartRateServiceUuid);
      this.characteristic = await service.getCharacteristic(heartRateCharacteristicUuid);

      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = event.target.value;
        const heartRate = value.getUint8(1);
        onHeartRateUpdate(heartRate);
      });

      return this.device.name || "Iron Watch";
    } catch (error) {
      console.error("Bluetooth Connection Error:", error);
      throw error;
    }
  }

  disconnect() {
    if (this.device?.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.device = null;
    this.server = null;
    this.characteristic = null;
  }
}

export const bluetoothManager = new BluetoothService();
