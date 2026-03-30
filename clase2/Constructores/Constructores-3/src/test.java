
public class test {
	 public static void main(String[] args) {
	        Guerrero g1 = new Guerrero("milico");
	        System.out.println(g1);

	        g1.mover(10, -5);
	        System.out.println("*se movio* " + g1);

	        g1.recibeDano(300);
	        System.out.println("*recibe 300 de daño*" + g1);

	        g1.recibeDano(600);
	        System.out.println("*recibe 600 de daño*" + g1);

	        Guerrero g2 = new Guerrero("milico2", 100, 200);
	        System.out.println(g2);
	    }
}
