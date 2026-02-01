# Product Manager Backend - AI Coding Guidelines

## Architecture Overview
This is a Spring Boot 3.5.9 backend application providing REST APIs for product management features, designed to integrate with a React frontend. The application uses JPA for data persistence with MySQL database.

Key components:
- **Main Application**: `ProductmanagerApplication.java` - Standard Spring Boot entry point
- **Entities**: JPA entities under `com.yamini.productmanager` package (to be implemented)
- **Controllers**: REST controllers for CRUD operations on products
- **Services**: Business logic layer
- **Repositories**: JPA repositories for data access

## Technology Stack
- Java 21
- Spring Boot 3.5.9 (Web, Data JPA)
- MySQL database
- Lombok for boilerplate reduction
- Maven for build management

## Development Workflows

### Building and Running
- **Build**: `./mvnw.cmd clean compile` or `./mvnw.cmd install`
- **Run**: `./mvnw.cmd spring-boot:run`
- **Test**: `./mvnw.cmd test`
- **Debug**: Use VS Code Java debugger or attach to port 5005 with `./mvnw.cmd spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"`

### Database Configuration
Add to `application.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/productdb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Code Patterns and Conventions

### Package Structure
All code resides in `com.yamini.productmanager` package. Follow standard Spring Boot layering:
- `entity/` - JPA entities
- `controller/` - REST controllers
- `service/` - Business services
- `repository/` - Data repositories

### Lombok Usage
Use Lombok annotations extensively:
- `@Data` on entities for getters/setters
- `@Entity` for JPA entities
- `@Id @GeneratedValue` for primary keys
- `@RestController @RequestMapping` on controllers

### REST API Design
- Controllers use `@RestController` with `@RequestMapping("/api/products")`
- Standard CRUD endpoints: GET /api/products, POST /api/products, PUT /api/products/{id}, DELETE /api/products/{id}
- Return `ResponseEntity<Product>` or `List<Product>`

### Entity Example
```java
@Entity
@Data
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer quantity;
}
```

### Controller Example
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
}
```

## Key Files
- `pom.xml`: Dependencies and build configuration
- `src/main/resources/application.properties`: Application configuration
- `HELP.md`: Spring Boot reference documentation

## Integration Points
- MySQL database for persistence
- React frontend consuming REST APIs
- CORS configuration may be needed for frontend integration

Focus on implementing product CRUD operations following Spring Boot best practices with JPA and REST conventions.