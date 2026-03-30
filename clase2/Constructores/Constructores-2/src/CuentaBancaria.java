public class CuentaBancaria {
    private String titular;
    private double saldo;
    private int cantidadDepositos;
    private int cantidadExtracciones;

    public CuentaBancaria(String titular) {
        this.titular = titular;
        this.saldo = 0;
        this.cantidadDepositos = 0;
        this.cantidadExtracciones = 0;
    }

    public String getTitular() {
        return titular;
    }

    public double getSaldo() {
        return saldo;
    }

    public int getcantidadDepositos() {
        return cantidadDepositos;
    }

    public int getcantidadExtracciones() {
        return cantidadExtracciones;
    }

    public void depositar(double cantidad) {
        saldo += cantidad;
        cantidadDepositos++;
        
    }

    public boolean extraer(double cantidad) {
    	boolean estado = false;
        if ( saldo >= cantidad) {
            saldo -= cantidad;
            cantidadExtracciones++;
            estado = true;
        }else {
        	estado = false;
        }
        return estado;
    }

    public String toString() {
        return "CuentaBancaria: titular=" + titular + ", saldo=" + saldo + ", depositos=" + cantidadDepositos + ", extracciones=" + cantidadExtracciones + "";
    }
}
