
public class test {
	
	public static void main(String[] args) {

		CuentaBancaria cuenta1 = new CuentaBancaria("Juan Pérez");

        System.out.println(cuenta1);

        cuenta1.depositar(1000);
        cuenta1.depositar(500);

        boolean exito1 = cuenta1.extraer(300);
        boolean exito2 = cuenta1.extraer(2000); 

        System.out.println("Extracción 1 exitosa: " + exito1);
        System.out.println("Extracción 2 exitosa: " + exito2);
        System.out.println(cuenta1);
    }
}
