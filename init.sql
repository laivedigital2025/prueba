-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DemoRegistration')
BEGIN
    CREATE DATABASE DemoRegistration;
END
GO

USE DemoRegistration;
GO

-- Crear tabla de eventos
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Events]') AND type in (N'U'))
BEGIN
    CREATE TABLE Events (
        EventId INT IDENTITY(1,1) PRIMARY KEY,
        EventName NVARCHAR(100) NOT NULL,
        MaxCapacity INT NOT NULL,
        CurrentCapacity INT DEFAULT 0,
        IsActive BIT DEFAULT 1
    );
END
GO

-- Crear tabla de registros
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Registrations]') AND type in (N'U'))
BEGIN
    CREATE TABLE Registrations (
        RegistrationId INT IDENTITY(1,1) PRIMARY KEY,
        EventId INT FOREIGN KEY REFERENCES Events(EventId),
        Email NVARCHAR(100) NOT NULL,
        RegistrationDate DATETIME DEFAULT GETDATE(),
        CONSTRAINT UQ_Email_Event UNIQUE (Email, EventId)
    );
END
GO

-- Insertar algunos eventos de ejemplo
IF NOT EXISTS (SELECT * FROM Events)
BEGIN
    INSERT INTO Events (EventName, MaxCapacity, CurrentCapacity, IsActive)
    VALUES 
        ('Demo de Producto A', 50, 0, 1),
        ('Demo de Producto B', 30, 0, 1),
        ('Demo de Producto C', 20, 0, 1);
END
GO 