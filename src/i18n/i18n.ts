import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        title: "VIP Aircraft Management",
        stats: {
          seatsOccupied: "{{occupied}}/{{total}} Seats Occupied",
          pendingRequests: "{{count}} Pending Requests"
        },
        emergency: "Emergency Assistance",
        passenger: {
          noAssignment: "No passenger assigned",
          seatLabel: "Seat {{seat}}"
        },
        logout: "Logout"
      },
      sidebar: {
        staff: {
          seatManagement: "Seat Management",
          passengers: "Passengers",
          requests: "Requests",
          cabinControl: "Cabin Control",
          flightInfo: "Flight Info"
        },
        vip: {
          preferences: "Your Preferences",
          requests: "Requests",
          flightInfo: "Flight Info"
        },
        notifications: {
          emergency: "{{count}} Emergency!",
          newRequests: "{{count}} new",
          flight: "{{count}} updates"
        }
      },
      layout: {
        errors: {
          noPassenger: {
            title: "No Passenger Assigned",
            message: "This seat currently has no passenger assigned. Please contact a staff member for assistance.",
            contactStaff: "Contact Staff"
          }
        }
      },
      login: {
        title: "VIP Aircraft Management",
        subtitle: "Please log in to continue",
        loginType: {
          label: "Login Type",
          staff: "Staff Member",
          seat: "Seat Login"
        },
        username: {
          staff: "Username",
          seat: "Seat Number"
        },
        password: "Password",
        selectSeat: "Select a seat",
        button: {
          loading: "Logging in...",
          default: "Log in"
        },
        errors: {
          invalidCredentials: "Invalid credentials",
          generalError: "An error occurred during login"
        }
      },
      seatManagement: {
        title: "Seat Management",
        addPassenger: "Add Passenger",
        seat: "Seat",
        status: {
          occupied: "occupied",
          available: "available",
          unassigned: "Unassigned"
        },
        modal: {
          title: "Add New Passenger",
          selectSeat: "Select Seat",
          chooseSeat: "Choose a seat",
          passengerName: "Passenger Name",
          dietaryPreferences: "Dietary Preferences",
          dietaryPlaceholder: "e.g., Vegetarian, No nuts",
          temperaturePreference: "Temperature Preference",
          cancel: "Cancel",
          add: "Add Passenger"
        },
        passengerInfo: {
          temperature: "Temperature: {{temp}}°C",
          dietary: "Dietary: {{preferences}}"
        },
        errors: {
          addingPassenger: "Error adding passenger. Please try again."
        }
      },
      reset: {
        button: {
          resetting: "Resetting...",
          default: "Reset All Seats"
        },
        confirmation: "Are you sure you want to reset all seat assignments? This action cannot be undone.",
        error: "Error resetting seats. Please try again."
      },
      passenger: {
        preferences: {
          title: "Your Preferences",
          temperature: "Temperature Preference",
          dietary: "Dietary Preferences",
          other: "Other Requirements",
          edit: "Edit Preferences",
          cancel: "Cancel",
          save: "Save Changes",
          noPassenger: "No passenger assigned to this seat.",
          placeholder: {
            dietary: "e.g., Vegetarian, No nuts",
            other: "Enter each requirement on a new line"
          }
        },
        list: {
          search: "Search passengers...",
          noResults: "No passengers found matching your search.",
          seat: "Seat",
          notAssigned: "Not assigned",
          edit: "Edit",
          cancel: "Cancel"
        }
      },
      request: {
        list: {
          title: {
            staff: "All Service Requests",
            passenger: "Your Requests"
          },
          filter: {
            all: "All Requests",
            pending: "Pending",
            "in-progress": "In Progress",
            completed: "Completed"
          },
          noRequests: {
            all: "No requests found.",
            filtered: "No {{status}} requests found."
          }
        },
        card: {
          unknownPassenger: "Unknown Passenger",
          seatLabel: "Seat {{seat}}",
          notAssigned: "Not assigned",
          type: "Type",
          details: "Details",
          time: "Time",
          buttons: {
            start: "Start Request",
            complete: "Complete Request",
            completed: "Completed"
          },
          timeline: {
            submitted: "Submitted",
            inProgress: "In Progress",
            completed: "Completed"
          }
        },
        new: {
          button: "New Service Request",
          title: "New Service Request",
          cancel: "Cancel",
          type: {
            label: "Request Type",
            meal: "Meal",
            drink: "Drink",
            temperature: "Temperature",
            light: "Light"
          },
          details: {
            label: "Request Details",
            placeholder: "Enter request details..."
          },
          submit: "Submit Request"
        }
      },
      cabin: {
        controls: {
          title: "Cabin Environment Control",
          zoneControls: "Zone Controls",
          overview: "Cabin Overview",
          seat: {
            title: "Seat {{id}}",
            unoccupied: "Unoccupied",
            activeRequests: "{{count}} active request(s)"
          }
        },
        zone: {
          temperature: {
            label: "Temperature",
            unit: "°C"
          },
          lighting: {
            label: "Lighting",
            unit: "%"
          }
        },
        layout: {
          position: {
            front: "Front",
            middle: "Middle",
            rear: "Rear"
          },
          preferences: {
            temperature: "Temp: {{temp}}°C",
            dietary: "Dietary: {{preferences}}"
          },
          pendingRequests: "Pending Requests",
          emergency: "🚨 EMERGENCY",
          labels: {
            available: "Available",
            occupied: "Occupied",
            hasRequests: "Has Requests",
            emergency: "Emergency"
          }
        }
      },
      flight: {
        title: "Flight Information",
        metrics: {
          title: "Flight Metrics",
          altitude: "Altitude",
          altitudeUnit: "m",
          speed: "Speed",
          speedUnit: "km/h",
          timeRemaining: "Time Remaining",
          timeFormat: "{{hours}}h {{minutes}}m"
        },
        progress: {
          title: "Flight Progress",
          departure: "Departure",
          arrival: "Arrival"
        },
        notifications: {
          title: "Flight Notifications",
          types: {
            info: "info",
            warning: "warning"
          },
          messages: {
            cruiseAltitude: "Entering cruise altitude",
            turbulence: "Light turbulence expected in 15 minutes"
          }
        }
      }
    }
  },
  fr: {
    translation: {
      header: {
        title: "Gestion des Avions VIP",
        stats: {
          seatsOccupied: "{{occupied}}/{{total}} Sièges Occupés",
          pendingRequests: "{{count}} Demandes en Attente"
        },
        emergency: "Assistance d'Urgence",
        passenger: {
          noAssignment: "Aucun passager assigné",
          seatLabel: "Siège {{seat}}"
        },
        logout: "Déconnexion"
      },
      sidebar: {
        staff: {
          seatManagement: "Gestion des Sièges",
          passengers: "Passagers",
          requests: "Demandes",
          cabinControl: "Contrôle Cabine",
          flightInfo: "Info Vol"
        },
        vip: {
          preferences: "Vos Préférences",
          requests: "Demandes",
          flightInfo: "Info Vol"
        },
        notifications: {
          emergency: "{{count}} Urgence !",
          newRequests: "{{count}} nouveau",
          flight: "{{count}} mises à jour"
        }
      },
      layout: {
        errors: {
          noPassenger: {
            title: "Aucun Passager Assigné",
            message: "Ce siège n'a actuellement aucun passager assigné. Veuillez contacter un membre du personnel pour obtenir de l'aide.",
            contactStaff: "Contacter le Personnel"
          }
        }
      },
      login: {
        title: "Gestion des Avions VIP",
        subtitle: "Veuillez vous connecter pour continuer",
        loginType: {
          label: "Type de Connexion",
          staff: "Membre du Personnel",
          seat: "Connexion Siège"
        },
        username: {
          staff: "Nom d'utilisateur",
          seat: "Numéro de Siège"
        },
        password: "Mot de passe",
        selectSeat: "Sélectionnez un siège",
        button: {
          loading: "Connexion en cours...",
          default: "Se connecter"
        },
        errors: {
          invalidCredentials: "Identifiants invalides",
          generalError: "Une erreur est survenue lors de la connexion"
        }
      },
      seatManagement: {
        title: "Gestion des Sièges",
        addPassenger: "Ajouter un Passager",
        seat: "Siège",
        status: {
          occupied: "occupé",
          available: "disponible",
          unassigned: "Non assigné"
        },
        modal: {
          title: "Ajouter un Nouveau Passager",
          selectSeat: "Sélectionner un Siège",
          chooseSeat: "Choisir un siège",
          passengerName: "Nom du Passager",
          dietaryPreferences: "Préférences Alimentaires",
          dietaryPlaceholder: "ex: Végétarien, Sans noix",
          temperaturePreference: "Préférence de Température",
          cancel: "Annuler",
          add: "Ajouter le Passager"
        },
        passengerInfo: {
          temperature: "Température: {{temp}}°C",
          dietary: "Régime: {{preferences}}"
        },
        errors: {
          addingPassenger: "Erreur lors de l'ajout du passager. Veuillez réessayer."
        }
      },
      reset: {
        button: {
          resetting: "Réinitialisation...",
          default: "Réinitialiser Tous les Sièges"
        },
        confirmation: "Êtes-vous sûr de vouloir réinitialiser toutes les attributions de sièges ? Cette action est irréversible.",
        error: "Erreur lors de la réinitialisation des sièges. Veuillez réessayer."
      },
      passenger: {
        preferences: {
          title: "Vos Préférences",
          temperature: "Préférence de Température",
          dietary: "Préférences Alimentaires",
          other: "Autres Exigences",
          edit: "Modifier les Préférences",
          cancel: "Annuler",
          save: "Enregistrer les Modifications",
          noPassenger: "Aucun passager assigné à ce siège.",
          placeholder: {
            dietary: "ex: Végétarien, Sans noix",
            other: "Saisissez chaque exigence sur une nouvelle ligne"
          }
        },
        list: {
          search: "Rechercher des passagers...",
          noResults: "Aucun passager ne correspond à votre recherche.",
          seat: "Siège",
          notAssigned: "Non assigné",
          edit: "Modifier",
          cancel: "Annuler"
        }
      },
      request: {
        list: {
          title: {
            staff: "Toutes les Demandes de Service",
            passenger: "Vos Demandes"
          },
          filter: {
            all: "Toutes les Demandes",
            pending: "En Attente",
            "in-progress": "En Cours",
            completed: "Terminées"
          },
          noRequests: {
            all: "Aucune demande trouvée.",
            filtered: "Aucune demande {{status}} trouvée."
          }
        },
        card: {
          unknownPassenger: "Passager Inconnu",
          seatLabel: "Siège {{seat}}",
          notAssigned: "Non assigné",
          type: "Type",
          details: "Détails",
          time: "Heure",
          buttons: {
            start: "Démarrer la Demande",
            complete: "Terminer la Demande",
            completed: "Terminée"
          },
          timeline: {
            submitted: "Soumise",
            inProgress: "En Cours",
            completed: "Terminée"
          }
        },
        new: {
          button: "Nouvelle Demande de Service",
          title: "Nouvelle Demande de Service",
          cancel: "Annuler",
          type: {
            label: "Type de Demande",
            meal: "Repas",
            drink: "Boisson",
            temperature: "Température",
            light: "Lumière"
          },
          details: {
            label: "Détails de la Demande",
            placeholder: "Entrez les détails de la demande..."
          },
          submit: "Soumettre la Demande"
        }
      },
      cabin: {
        controls: {
          title: "Contrôle de l'Environnement de Cabine",
          zoneControls: "Contrôles des Zones",
          overview: "Vue d'Ensemble de la Cabine",
          seat: {
            title: "Siège {{id}}",
            unoccupied: "Inoccupé",
            activeRequests: "{{count}} demande(s) active(s)"
          }
        },
        zone: {
          temperature: {
            label: "Température",
            unit: "°C"
          },
          lighting: {
            label: "Éclairage",
            unit: "%"
          }
        },
        layout: {
          position: {
            front: "Avant",
            middle: "Milieu",
            rear: "Arrière"
          },
          preferences: {
            temperature: "Temp: {{temp}}°C",
            dietary: "Régime: {{preferences}}"
          },
          pendingRequests: "Demandes en Attente",
          emergency: "🚨 URGENCE",
          labels: {
            available: "Disponible",
            occupied: "Occupé",
            hasRequests: "A des Demandes",
            emergency: "Urgence"
          }
        }
      },
      flight: {
        title: "Informations de Vol",
        metrics: {
          title: "Métriques de Vol",
          altitude: "Altitude",
          altitudeUnit: "m",
          speed: "Vitesse",
          speedUnit: "km/h",
          timeRemaining: "Temps Restant",
          timeFormat: "{{hours}}h {{minutes}}m"
        },
        progress: {
          title: "Progression du Vol",
          departure: "Départ",
          arrival: "Arrivée"
        },
        notifications: {
          title: "Notifications de Vol",
          types: {
            info: "info",
            warning: "avertissement"
          },
          messages: {
            cruiseAltitude: "Atteinte de l'altitude de croisière",
            turbulence: "Légère turbulence prévue dans 15 minutes"
          }
        }
      }
    }
  },
  de: {
    translation: {
      header: {
        title: "VIP-Flugzeugverwaltung",
        stats: {
          seatsOccupied: "{{occupied}}/{{total}} Sitze belegt",
          pendingRequests: "{{count}} ausstehende Anfragen"
        },
        emergency: "Notfallhilfe",
        passenger: {
          noAssignment: "Kein Passagier zugewiesen",
          seatLabel: "Sitz {{seat}}"
        },
        logout: "Abmelden"
      },
      sidebar: {
        staff: {
          seatManagement: "Sitzverwaltung",
          passengers: "Passagiere",
          requests: "Anfragen",
          cabinControl: "Kabinensteuerung",
          flightInfo: "Fluginformationen"
        },
        vip: {
          preferences: "Ihre Einstellungen",
          requests: "Anfragen",
          flightInfo: "Fluginformationen"
        },
        notifications: {
          emergency: "{{count}} Notfall!",
          newRequests: "{{count}} neu",
          flight: "{{count}} Aktualisierungen"
        }
      },
      layout: {
        errors: {
          noPassenger: {
            title: "Kein Passagier zugewiesen",
            message: "Diesem Sitzplatz ist derzeit kein Passagier zugewiesen. Bitte wenden Sie sich an einen Mitarbeiter.",
            contactStaff: "Mitarbeiter kontaktieren"
          }
        }
      },
      login: {
        title: "VIP-Flugzeugverwaltung",
        subtitle: "Bitte melden Sie sich an, um fortzufahren",
        loginType: {
          label: "Anmeldetyp",
          staff: "Mitarbeiter",
          seat: "Sitzanmeldung"
        },
        username: {
          staff: "Benutzername",
          seat: "Sitznummer"
        },
        password: "Passwort",
        selectSeat: "Wählen Sie einen Sitz",
        button: {
          loading: "Anmeldung läuft...",
          default: "Anmelden"
        },
        errors: {
          invalidCredentials: "Ungültige Anmeldedaten",
          generalError: "Bei der Anmeldung ist ein Fehler aufgetreten"
        }
      },
      seatManagement: {
        title: "Sitzverwaltung",
        addPassenger: "Passagier hinzufügen",
        seat: "Sitz",
        status: {
          occupied: "besetzt",
          available: "verfügbar",
          unassigned: "Nicht zugewiesen"
        },
        modal: {
          title: "Neuen Passagier hinzufügen",
          selectSeat: "Sitz auswählen",
          chooseSeat: "Wählen Sie einen Sitz",
          passengerName: "Passagiername",
          dietaryPreferences: "Ernährungspräferenzen",
          dietaryPlaceholder: "z.B. Vegetarisch, Keine Nüsse",
          temperaturePreference: "Temperaturpräferenz",
          cancel: "Abbrechen",
          add: "Passagier hinzufügen"
        },
        passengerInfo: {
          temperature: "Temperatur: {{temp}}°C",
          dietary: "Ernährung: {{preferences}}"
        },
        errors: {
          addingPassenger: "Fehler beim Hinzufügen des Passagiers. Bitte versuchen Sie es erneut."
        }
      },
      reset: {
        button: {
          resetting: "Wird zurückgesetzt...",
          default: "Alle Sitze zurücksetzen"
        },
        confirmation: "Sind Sie sicher, dass Sie alle Sitzzuweisungen zurücksetzen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
        error: "Fehler beim Zurücksetzen der Sitze. Bitte versuchen Sie es erneut."
      },
      passenger: {
        preferences: {
          title: "Ihre Präferenzen",
          temperature: "Temperaturpräferenz",
          dietary: "Ernährungspräferenzen",
          other: "Weitere Anforderungen",
          edit: "Präferenzen bearbeiten",
          cancel: "Abbrechen",
          save: "Änderungen speichern",
          noPassenger: "Kein Passagier diesem Sitz zugewiesen.",
          placeholder: {
            dietary: "z.B. Vegetarisch, Keine Nüsse",
            other: "Geben Sie jede Anforderung in einer neuen Zeile ein"
          }
        },
        list: {
          search: "Passagiere suchen...",
          noResults: "Keine Passagiere für Ihre Suche gefunden.",
          seat: "Sitz",
          notAssigned: "Nicht zugewiesen",
          edit: "Bearbeiten",
          cancel: "Abbrechen"
        }
      },
      request: {
        list: {
          title: {
            staff: "Alle Serviceanfragen",
            passenger: "Ihre Anfragen"
          },
          filter: {
            all: "Alle Anfragen",
            pending: "Ausstehend",
            "in-progress": "In Bearbeitung",
            completed: "Abgeschlossen"
          },
          noRequests: {
            all: "Keine Anfragen gefunden.",
            filtered: "Keine {{status}} Anfragen gefunden."
          }
        },
        card: {
          unknownPassenger: "Unbekannter Passagier",
          seatLabel: "Sitz {{seat}}",
          notAssigned: "Nicht zugewiesen",
          type: "Typ",
          details: "Details",
          time: "Zeit",
          buttons: {
            start: "Anfrage starten",
            complete: "Anfrage abschließen",
            completed: "Abgeschlossen"
          },
          timeline: {
            submitted: "Eingereicht",
            inProgress: "In Bearbeitung",
            completed: "Abgeschlossen"
          }
        },
        new: {
          button: "Neue Serviceanfrage",
          title: "Neue Serviceanfrage",
          cancel: "Abbrechen",
          type: {
            label: "Anfragetyp",
            meal: "Mahlzeit",
            drink: "Getränk",
            temperature: "Temperatur",
            light: "Licht"
          },
          details: {
            label: "Anfragedetails",
            placeholder: "Geben Sie die Anfragedetails ein..."
          },
          submit: "Anfrage einreichen"
        }
      },
      cabin: {
        controls: {
          title: "Kabinen-Umgebungssteuerung",
          zoneControls: "Zonensteuerung",
          overview: "Kabinenübersicht",
          seat: {
            title: "Sitz {{id}}",
            unoccupied: "Unbesetzt",
            activeRequests: "{{count}} aktive Anfrage(n)"
          }
        },
        zone: {
          temperature: {
            label: "Temperatur",
            unit: "°C"
          },
          lighting: {
            label: "Beleuchtung",
            unit: "%"
          }
        },
        layout: {
          position: {
            front: "Vorne",
            middle: "Mitte",
            rear: "Hinten"
          },
          preferences: {
            temperature: "Temp: {{temp}}°C",
            dietary: "Ernährung: {{preferences}}"
          },
          pendingRequests: "Ausstehende Anfragen",
          emergency: "🚨 NOTFALL",
          labels: {
            available: "Verfügbar",
            occupied: "Besetzt",
            hasRequests: "Hat Anfragen",
            emergency: "Notfall"
          }
        }
      },
      flight: {
        title: "Fluginformationen",
        metrics: {
          title: "Flugmetriken",
          altitude: "Höhe",
          altitudeUnit: "m",
          speed: "Geschwindigkeit",
          speedUnit: "km/h",
          timeRemaining: "Verbleibende Zeit",
          timeFormat: "{{hours}}h {{minutes}}m"
        },
        progress: {
          title: "Flugfortschritt",
          departure: "Abflug",
          arrival: "Ankunft"
        },
        notifications: {
          title: "Flugbenachrichtigungen",
          types: {
            info: "Info",
            warning: "Warnung"
          },
          messages: {
            cruiseAltitude: "Reiseflughöhe wird erreicht",
            turbulence: "Leichte Turbulenz in 15 Minuten erwartet"
          }
        }
      }
    }
  },
  es: {
    translation: {
      header: {
        title: "Gestión de Aeronaves VIP",
        stats: {
          seatsOccupied: "{{occupied}}/{{total}} Asientos Ocupados",
          pendingRequests: "{{count}} Solicitudes Pendientes"
        },
        emergency: "Asistencia de Emergencia",
        passenger: {
          noAssignment: "Ningún pasajero asignado",
          seatLabel: "Asiento {{seat}}"
        },
        logout: "Cerrar Sesión"
      },
      sidebar: {
        staff: {
          seatManagement: "Gestión de Asientos",
          passengers: "Pasajeros",
          requests: "Solicitudes",
          cabinControl: "Control de Cabina",
          flightInfo: "Info de Vuelo"
        },
        vip: {
          preferences: "Sus Preferencias",
          requests: "Solicitudes",
          flightInfo: "Info de Vuelo"
        },
        notifications: {
          emergency: "{{count}} Emergencia!",
          newRequests: "{{count}} nuevo",
          flight: "{{count}} actualizaciones"
        }
      },
      layout: {
        errors: {
          noPassenger: {
            title: "Sin Pasajero Asignado",
            message: "Este asiento no tiene ningún pasajero asignado actualmente. Por favor, contacte con un miembro del personal para obtener ayuda.",
            contactStaff: "Contactar Personal"
          }
        }
      },
      login: {
        title: "Gestión de Aeronaves VIP",
        subtitle: "Por favor, inicie sesión para continuar",
        loginType: {
          label: "Tipo de Inicio de Sesión",
          staff: "Miembro del Personal",
          seat: "Inicio de Sesión de Asiento"
        },
        username: {
          staff: "Usuario",
          seat: "Número de Asiento"
        },
        password: "Contraseña",
        selectSeat: "Seleccione un asiento",
        button: {
          loading: "Iniciando sesión...",
          default: "Iniciar sesión"
        },
        errors: {
          invalidCredentials: "Credenciales inválidas",
          generalError: "Ocurrió un error durante el inicio de sesión"
        }
      },
      seatManagement: {
        title: "Gestión de Asientos",
        addPassenger: "Añadir Pasajero",
        seat: "Asiento",
        status: {
          occupied: "ocupado",
          available: "disponible",
          unassigned: "Sin asignar"
        },
        modal: {
          title: "Añadir Nuevo Pasajero",
          selectSeat: "Seleccionar Asiento",
          chooseSeat: "Elija un asiento",
          passengerName: "Nombre del Pasajero",
          dietaryPreferences: "Preferencias Alimentarias",
          dietaryPlaceholder: "ej. Vegetariano, Sin nueces",
          temperaturePreference: "Preferencia de Temperatura",
          cancel: "Cancelar",
          add: "Añadir Pasajero"
        },
        passengerInfo: {
          temperature: "Temperatura: {{temp}}°C",
          dietary: "Dieta: {{preferences}}"
        },
        errors: {
          addingPassenger: "Error al añadir el pasajero. Por favor, inténtelo de nuevo."
        }
      },
      reset: {
        button: {
          resetting: "Reiniciando...",
          default: "Reiniciar Todos los Asientos"
        },
        confirmation: "¿Está seguro de que desea reiniciar todas las asignaciones de asientos? Esta acción no se puede deshacer.",
        error: "Error al reiniciar los asientos. Por favor, inténtelo de nuevo."
      },
      passenger: {
        preferences: {
          title: "Sus Preferencias",
          temperature: "Preferencia de Temperatura",
          dietary: "Preferencias Alimentarias",
          other: "Otros Requisitos",
          edit: "Editar Preferencias",
          cancel: "Cancelar",
          save: "Guardar Cambios",
          noPassenger: "Ningún pasajero asignado a este asiento.",
          placeholder: {
            dietary: "ej. Vegetariano, Sin nueces",
            other: "Ingrese cada requisito en una nueva línea"
          }
        },
        list: {
          search: "Buscar pasajeros...",
          noResults: "No se encontraron pasajeros que coincidan con su búsqueda.",
          seat: "Asiento",
          notAssigned: "No asignado",
          edit: "Editar",
          cancel: "Cancelar"
        }
      },
      request: {
        list: {
          title: {
            staff: "Todas las Solicitudes de Servicio",
            passenger: "Sus Solicitudes"
          },
          filter: {
            all: "Todas las Solicitudes",
            pending: "Pendientes",
            "in-progress": "En Proceso",
            completed: "Completadas"
          },
          noRequests: {
            all: "No se encontraron solicitudes.",
            filtered: "No se encontraron solicitudes {{status}}."
          }
        },
        card: {
          unknownPassenger: "Pasajero Desconocido",
          seatLabel: "Asiento {{seat}}",
          notAssigned: "No asignado",
          type: "Tipo",
          details: "Detalles",
          time: "Hora",
          buttons: {
            start: "Iniciar Solicitud",
            complete: "Completar Solicitud",
            completed: "Completada"
          },
          timeline: {
            submitted: "Enviada",
            inProgress: "En Proceso",
            completed: "Completada"
          }
        },
        new: {
          button: "Nueva Solicitud de Servicio",
          title: "Nueva Solicitud de Servicio",
          cancel: "Cancelar",
          type: {
            label: "Tipo de Solicitud",
            meal: "Comida",
            drink: "Bebida",
            temperature: "Temperatura",
            light: "Luz"
          },
          details: {
            label: "Detalles de la Solicitud",
            placeholder: "Ingrese los detalles de la solicitud..."
          },
          submit: "Enviar Solicitud"
        }
      },
      cabin: {
        controls: {
          title: "Control Ambiental de Cabina",
          zoneControls: "Controles de Zona",
          overview: "Vista General de Cabina",
          seat: {
            title: "Asiento {{id}}",
            unoccupied: "Desocupado",
            activeRequests: "{{count}} solicitud(es) activa(s)"
          }
        },
        zone: {
          temperature: {
            label: "Temperatura",
            unit: "°C"
          },
          lighting: {
            label: "Iluminación",
            unit: "%"
          }
        },
        layout: {
          position: {
            front: "Frontal",
            middle: "Medio",
            rear: "Trasero"
          },
          preferences: {
            temperature: "Temp: {{temp}}°C",
            dietary: "Dieta: {{preferences}}"
          },
          pendingRequests: "Solicitudes Pendientes",
          emergency: "🚨 EMERGENCIA",
          labels: {
            available: "Disponible",
            occupied: "Ocupado",
            hasRequests: "Tiene Solicitudes",
            emergency: "Emergencia"
          }
        }
      },
      flight: {
        title: "Información del Vuelo",
        metrics: {
          title: "Métricas del Vuelo",
          altitude: "Altitud",
          altitudeUnit: "m",
          speed: "Velocidad",
          speedUnit: "km/h",
          timeRemaining: "Tiempo Restante",
          timeFormat: "{{hours}}h {{minutes}}m"
        },
        progress: {
          title: "Progreso del Vuelo",
          departure: "Salida",
          arrival: "Llegada"
        },
        notifications: {
          title: "Notificaciones del Vuelo",
          types: {
            info: "información",
            warning: "advertencia"
          },
          messages: {
            cruiseAltitude: "Alcanzando altitud de crucero",
            turbulence: "Se espera turbulencia leve en 15 minutos"
          }
        }
      }
    }
  },
  it: {
    translation: {
      header: {
        title: "Gestione Aerei VIP",
        stats: {
          seatsOccupied: "{{occupied}}/{{total}} Posti Occupati",
          pendingRequests: "{{count}} Richieste in Attesa"
        },
        emergency: "Assistenza di Emergenza",
        passenger: {
          noAssignment: "Nessun passeggero assegnato",
          seatLabel: "Posto {{seat}}"
        },
        logout: "Disconnetti"
      },
      sidebar: {
        staff: {
          seatManagement: "Gestione Posti",
          passengers: "Passeggeri",
          requests: "Richieste",
          cabinControl: "Controllo Cabina",
          flightInfo: "Info Volo"
        },
        vip: {
          preferences: "Le tue Preferenze",
          requests: "Richieste",
          flightInfo: "Info Volo"
        },
        notifications: {
          emergency: "{{count}} Emergenza!",
          newRequests: "{{count}} nuovo",
          flight: "{{count}} aggiornamenti"
        }
      },
      layout: {
        errors: {
          noPassenger: {
            title: "Nessun Passeggero Assegnato",
            message: "Questo posto non ha attualmente alcun passeggero assegnato. Si prega di contattare un membro del personale per assistenza.",
            contactStaff: "Contattare il Personale"
          }
        }
      },
      login: {
        title: "Gestione Aerei VIP",
        subtitle: "Accedi per continuare",
        loginType: {
          label: "Tipo di Accesso",
          staff: "Membro del Personale",
          seat: "Accesso al Posto"
        },
        username: {
          staff: "Nome utente",
          seat: "Numero del Posto"
        },
        password: "Password",
        selectSeat: "Seleziona un posto",
        button: {
          loading: "Accesso in corso...",
          default: "Accedi"
        },
        errors: {
          invalidCredentials: "Credenziali non valide",
          generalError: "Si è verificato un errore durante l'accesso"
        }
      },
      seatManagement: {
        title: "Gestione Posti",
        addPassenger: "Aggiungi Passeggero",
        seat: "Posto",
        status: {
          occupied: "occupato",
          available: "disponibile",
          unassigned: "Non assegnato"
        },
        modal: {
          title: "Aggiungi Nuovo Passeggero",
          selectSeat: "Seleziona Posto",
          chooseSeat: "Scegli un posto",
          passengerName: "Nome del Passeggero",
          dietaryPreferences: "Preferenze Alimentari",
          dietaryPlaceholder: "es. Vegetariano, Senza frutta secca",
          temperaturePreference: "Preferenza Temperatura",
          cancel: "Annulla",
          add: "Aggiungi Passeggero"
        },
        passengerInfo: {
          temperature: "Temperatura: {{temp}}°C",
          dietary: "Dieta: {{preferences}}"
        },
        errors: {
          addingPassenger: "Errore nell'aggiunta del passeggero. Si prega di riprovare."
        }
      },
      reset: {
        button: {
          resetting: "Ripristino in corso...",
          default: "Ripristina Tutti i Posti"
        },
        confirmation: "Sei sicuro di voler ripristinare tutte le assegnazioni dei posti? Questa azione non può essere annullata.",
        error: "Errore nel ripristino dei posti. Si prega di riprovare."
      },
      passenger: {
        preferences: {
          title: "Le tue Preferenze",
          temperature: "Preferenza Temperatura",
          dietary: "Preferenze Alimentari",
          other: "Altri Requisiti",
          edit: "Modifica Preferenze",
          cancel: "Annulla",
          save: "Salva Modifiche",
          noPassenger: "Nessun passeggero assegnato a questo posto.",
          placeholder: {
            dietary: "es. Vegetariano, Senza frutta secca",
            other: "Inserisci ogni requisito su una nuova riga"
          }
        },
        list: {
          search: "Cerca passeggeri...",
          noResults: "Nessun passeggero trovato per la tua ricerca.",
          seat: "Posto",
          notAssigned: "Non assegnato",
          edit: "Modifica",
          cancel: "Annulla"
        }
      },
      request: {
        list: {
          title: {
            staff: "Tutte le Richieste di Servizio",
            passenger: "Le tue Richieste"
          },
          filter: {
            all: "Tutte le Richieste",
            pending: "In Attesa",
            "in-progress": "In Corso",
            completed: "Completate"
          },
          noRequests: {
            all: "Nessuna richiesta trovata.",
            filtered: "Nessuna richiesta {{status}} trovata."
          }
        },
        card: {
          unknownPassenger: "Passeggero Sconosciuto",
          seatLabel: "Posto {{seat}}",
          notAssigned: "Non assegnato",
          type: "Tipo",
          details: "Dettagli",
          time: "Ora",
          buttons: {
            start: "Avvia Richiesta",
            complete: "Completa Richiesta",
            completed: "Completata"
          },
          timeline: {
            submitted: "Inviata",
            inProgress: "In Corso",
            completed: "Completata"
          }
        },
        new: {
          button: "Nuova Richiesta di Servizio",
          title: "Nuova Richiesta di Servizio",
          cancel: "Annulla",
          type: {
            label: "Tipo di Richiesta",
            meal: "Pasto",
            drink: "Bevanda",
            temperature: "Temperatura",
            light: "Luce"
          },
          details: {
            label: "Dettagli della Richiesta",
            placeholder: "Inserisci i dettagli della richiesta..."
          },
          submit: "Invia Richiesta"
        }
      },
      cabin: {
        controls: {
          title: "Controllo Ambiente Cabina",
          zoneControls: "Controlli Zone",
          overview: "Panoramica Cabina",
          seat: {
            title: "Posto {{id}}",
            unoccupied: "Non occupato",
            activeRequests: "{{count}} richiesta/e attiva/e"
          }
        },
        zone: {
          temperature: {
            label: "Temperatura",
            unit: "°C"
          },
          lighting: {
            label: "Illuminazione",
            unit: "%"
          }
        },
        layout: {
          position: {
            front: "Anteriore",
            middle: "Centrale",
            rear: "Posteriore"
          },
          preferences: {
            temperature: "Temp: {{temp}}°C",
            dietary: "Dieta: {{preferences}}"
          },
          pendingRequests: "Richieste in Sospeso",
          emergency: "🚨 EMERGENZA",
          labels: {
            available: "Disponibile",
            occupied: "Occupato",
            hasRequests: "Ha Richieste",
            emergency: "Emergenza"
          }
        }
      },
      flight: {
        title: "Informazioni Volo",
        metrics: {
          title: "Metriche di Volo",
          altitude: "Altitudine",
          altitudeUnit: "m",
          speed: "Velocità",
          speedUnit: "km/h",
          timeRemaining: "Tempo Rimanente",
          timeFormat: "{{hours}}h {{minutes}}m"
        },
        progress: {
          title: "Avanzamento Volo",
          departure: "Partenza",
          arrival: "Arrivo"
        },
        notifications: {
          title: "Notifiche di Volo",
          types: {
            info: "info",
            warning: "avviso"
          },
          messages: {
            cruiseAltitude: "Raggiungimento quota di crociera",
            turbulence: "Prevista leggera turbolenza tra 15 minuti"
          }
        }
      }
    }
  },
  zh: {
    translation: {
      header: {
        title: "贵宾专机管理",
        stats: {
          seatsOccupied: "已占用座位 {{occupied}}/{{total}}",
          pendingRequests: "{{count}} 个待处理请求"
        },
        emergency: "紧急援助",
        passenger: {
          noAssignment: "未分配乘客",
          seatLabel: "座位 {{seat}}"
        },
        logout: "退出登录"
      },
      sidebar: {
        staff: {
          seatManagement: "座位管理",
          passengers: "乘客",
          requests: "请求",
          cabinControl: "客舱控制",
          flightInfo: "航班信息"
        },
        vip: {
          preferences: "您的偏好",
          requests: "请求",
          flightInfo: "航班信息"
        },
        notifications: {
          emergency: "{{count}} 紧急!",
          newRequests: "{{count}} 新",
          flight: "{{count}} 更新"
        }
      },
      layout: {
        errors: {
          noPassenger: {
            title: "未分配乘客",
            message: "该座位目前未分配乘客。请联系工作人员寻求帮助。",
            contactStaff: "联系工作人员"
          }
        }
      },
      login: {
        title: "贵宾专机管理",
        subtitle: "请登录以继续",
        loginType: {
          label: "登录类型",
          staff: "工作人员",
          seat: "座位登录"
        },
        username: {
          staff: "用户名",
          seat: "座位号"
        },
        password: "密码",
        selectSeat: "选择座位",
        button: {
          loading: "登录中...",
          default: "登录"
        },
        errors: {
          invalidCredentials: "无效的凭据",
          generalError: "登录时发生错误"
        }
      },
      seatManagement: {
        title: "座位管理",
        addPassenger: "添加乘客",
        seat: "座位",
        status: {
          occupied: "已占用",
          available: "可用",
          unassigned: "未分配"
        },
        modal: {
          title: "添加新乘客",
          selectSeat: "选择座位",
          chooseSeat: "请选择座位",
          passengerName: "乘客姓名",
          dietaryPreferences: "饮食偏好",
          dietaryPlaceholder: "例如：素食，无坚果",
          temperaturePreference: "温度偏好",
          cancel: "取消",
          add: "添加乘客"
        },
        passengerInfo: {
          temperature: "温度：{{temp}}°C",
          dietary: "饮食：{{preferences}}"
        },
        errors: {
          addingPassenger: "添加乘客时出错。请重试。"
        }
      },
      reset: {
        button: {
          resetting: "重置中...",
          default: "重置所有座位"
        },
        confirmation: "您确定要重置所有座位分配吗？此操作无法撤消。",
        error: "重置座位时出错。请重试。"
      },
      passenger: {
        preferences: {
          title: "您的偏好设置",
          temperature: "温度偏好",
          dietary: "饮食偏好",
          other: "其他要求",
          edit: "编辑偏好",
          cancel: "取消",
          save: "保存更改",
          noPassenger: "此座位未分配乘客。",
          placeholder: {
            dietary: "例如：素食，无坚果",
            other: "每行输入一个要求"
          }
        },
        list: {
          search: "搜索乘客...",
          noResults: "未找到匹配的乘客。",
          seat: "座位",
          notAssigned: "未分配",
          edit: "编辑",
          cancel: "取消"
        }
      },
      request: {
        list: {
          title: {
            staff: "所有服务请求",
            passenger: "您的请求"
          },
          filter: {
            all: "所有请求",
            pending: "待处理",
            "in-progress": "处理中",
            completed: "已完成"
          },
          noRequests: {
            all: "未找到请求。",
            filtered: "未找到{{status}}请求。"
          }
        },
        card: {
          unknownPassenger: "未知乘客",
          seatLabel: "座位 {{seat}}",
          notAssigned: "未分配",
          type: "类型",
          details: "详情",
          time: "时间",
          buttons: {
            start: "开始处理",
            complete: "完成请求",
            completed: "已完成"
          },
          timeline: {
            submitted: "已提交",
            inProgress: "处理中",
            completed: "已完成"
          }
        },
        new: {
          button: "新服务请求",
          title: "新服务请求",
          cancel: "取消",
          type: {
            label: "请求类型",
            meal: "餐食",
            drink: "饮品",
            temperature: "温度",
            light: "灯光"
          },
          details: {
            label: "请求详情",
            placeholder: "请输入请求详情..."
          },
          submit: "提交请求"
        }
      },
      cabin: {
        controls: {
          title: "客舱环境控制",
          zoneControls: "区域控制",
          overview: "客舱概览",
          seat: {
            title: "座位 {{id}}",
            unoccupied: "空置",
            activeRequests: "{{count}} 个活动请求"
          }
        },
        zone: {
          temperature: {
            label: "温度",
            unit: "°C"
          },
          lighting: {
            label: "照明",
            unit: "%"
          }
        },
        layout: {
          position: {
            front: "前部",
            middle: "中部",
            rear: "后部"
          },
          preferences: {
            temperature: "温度：{{temp}}°C",
            dietary: "饮食：{{preferences}}"
          },
          pendingRequests: "待处理请求",
          emergency: "🚨 紧急",
          labels: {
            available: "可用",
            occupied: "已占用",
            hasRequests: "有请求",
            emergency: "紧急"
          }
        }
      },
      flight: {
        title: "航班信息",
        metrics: {
          title: "飞行数据",
          altitude: "高度",
          altitudeUnit: "米",
          speed: "速度",
          speedUnit: "公里/时",
          timeRemaining: "剩余时间",
          timeFormat: "{{hours}}小时{{minutes}}分钟"
        },
        progress: {
          title: "飞行进度",
          departure: "出发",
          arrival: "到达"
        },
        notifications: {
          title: "飞行通知",
          types: {
            info: "信息",
            warning: "警告"
          },
          messages: {
            cruiseAltitude: "正在进入巡航高度",
            turbulence: "预计15分钟后有轻微颠簸"
          }
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;