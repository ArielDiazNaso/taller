public class test {
	
    public static void main(String[] args) {

    	Persona persona1 = new Persona("Carlos", 20);
        System.out.println(persona1);
        System.out.println("¿Es mayor de edad? " + persona1.sosMayor());
        System.out.println("Repes de a " + persona1.repeticionesDeLetra('a'));

        Persona persona2 = new Persona("Pedro", 17, "correo");
        System.out.println(persona2);
        System.out.println("¿Es mayor de edad? " + persona2.sosMayor());
        System.out.println("Repes de a " + persona2.repeticionesDeLetra('a'));

        persona1.setEdad(25);
        persona1.setEmail("correonuevo@gmail.com");
        System.out.println("Actualizado: " + persona1);
    }
}
