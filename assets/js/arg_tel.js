(function () {
  // 🔥 Selector que contiene TODOS tus selects de localidad (para no usar 25 ifs)
  const LOCALIDADES_SELECTOR = [
    ".hs_localidades_buenos_aires select",
    ".hs_localidades_catamarca select",
    ".hs_localidades_chaco select",
    ".hs_localidades_chubut select",
    ".hs_ciudad_autonoma_de_buenos_aires__caba_ select",
    ".hs_cordoba select",
    ".hs_corrientes select",
    ".hs_entre_rios select",
    ".hs_formosa select",
    ".hs_jujuy select",
    ".hs_la_pampa select",
    ".hs_la_rioja select",
    ".hs_mendoza select",
    ".hs_misiones select",
    ".hs_neuquen select",
    ".hs_rio_negro select",
    ".hs_salta select",
    ".hs_san_juan select",
    ".hs_san_luis select",
    ".hs_santa_cruz select",
    ".hs_santa_fe select",
    ".hs_santiago_del_estero select",
    ".hs_tierra_del_fuego select",
    ".hs_tucuman select",
  ].join(", ");

  function get_prefijos(ciudad, tipoTel, $form) {
    let prefijo_out_0 = "";
    let prefijo_out = "";
    const v_placeholder = "Ingresar solo número de teléfono sin prefijos";

    if (!ciudad) return;

    const numerosEncontrados = String(ciudad).match(/\d{2,4}$/);

    if (numerosEncontrados) {
      const cod = numerosEncontrados[0];
      prefijo_out_0 = cod;
      prefijo_out = tipoTel === "Celular" ? cod + "-15" : cod;
    }

    // ✅ TODO dentro de ESTE form
    $form.find(".hs_form___telefono___prefijo2 .input input").val(prefijo_out_0);
    $form.find(".hs_form___telefono___prefijo3 .input input").val("+54-" + prefijo_out);
    $form.find(".hs_form___telefono___prefijo4 .input input").attr("placeholder", v_placeholder);
  }

  function mostrar_tel($form) {
    $form.find(".hs_form___tipo_telefono").removeClass("d-none");
    $form.find(".hs_form___telefono___prefijo3").removeClass("d-none");
    $form.find(".hs_form___telefono___prefijo4").removeClass("d-none");
  }

  function ocultar_tel($form) {
    $form.find(".hs_form___tipo_telefono").addClass("d-none");
    $form.find(".hs_form___telefono___prefijo3").addClass("d-none");
    $form.find(".hs_form___telefono___prefijo4").addClass("d-none");
  }

  // Inicializa cada form apenas exista
  function initForm($form) {
    if ($form.data("prefijos_inited")) return; // evita duplicar init
    $form.data("prefijos_inited", true);

    // estado por form (NO global)
    $form.data("tipo_tel", "Celular");
    $form.data("ciudad", "");
    $form.data("provincia", "");

    // oculto por default solo en este form
    ocultar_tel($form);
    $form.find(".hs_form___telefono___prefijo3 .input input").val("XXX-XX");
  }

  // HubSpot a veces renderiza luego: intentamos varias veces
  function initAll() {
    $("form.hs-form").each(function () {
      initForm($(this));
    });
  }
  $(window).on("load", function () {
    setTimeout(initAll, 200);
    setTimeout(initAll, 800);
    setTimeout(initAll, 1500);
    setTimeout(initAll, 2500);
  });

  
  $(document).on("click", "form.hs-form input[type='radio']", function () {
    const $form = $(this).closest("form.hs-form");
    initForm($form);

    const tipoTel = this.value || "Celular";
    $form.data("tipo_tel", tipoTel);

    const ciudad = $form.data("ciudad") || "";
    get_prefijos(ciudad, tipoTel, $form);
  });

  
  $(document).on(
    "keydown keypress paste",
    "form.hs-form .hs_form___telefono___prefijo3",
    function (e) {
      e.preventDefault();
    }
  );

  
  $(document).on("change", "form.hs-form .hs_provincia select", function () {
    const $form = $(this).closest("form.hs-form");
    initForm($form);

    $form.data("provincia", $(this).val() || "");
    $form.data("ciudad", "");
    ocultar_tel($form);
  });

  
  $(document).on("change", "form.hs-form " + LOCALIDADES_SELECTOR, function () {
    const $form = $(this).closest("form.hs-form");
    initForm($form);

    const ciudad = $(this).val() || "";
    $form.data("ciudad", ciudad);

    const tipoTel = $form.data("tipo_tel") || "Celular";
    get_prefijos(ciudad, tipoTel, $form);
    mostrar_tel($form);
    limiteTelefono();
  });


  function limiteTelefono() {
    const MIN_LENGTH = 6;
    const MAX_LENGTH = 8;

    const INPUT_IDS = window.PHONE_INPUT_IDS || [];

    const sanitize = (val) =>
      (val || "").replace(/\D/g, "").slice(0, MAX_LENGTH);

    const setupPhoneInput = (inputId) => {
      const input = document.getElementById(inputId);
      if (!input) return;

      if (input.dataset.limiteTelefonoInit === "1") return;
      input.dataset.limiteTelefonoInit = "1";

      input.setAttribute("inputmode", "numeric");
      input.setAttribute("autocomplete", "tel");
      input.setAttribute("maxlength", String(MAX_LENGTH));

      // 👉 crear mensaje debajo del input
      let errorEl = document.createElement("div");
      errorEl.className = "phone-error";
      errorEl.textContent = `El número debe tener entre ${MIN_LENGTH} y ${MAX_LENGTH} dígitos.`;

      input.parentNode.appendChild(errorEl);

      const validate = () => {
        const len = input.value.length;

        if (len === 0) {
          errorEl.style.display = "none";
          return true;
        }

        if (len < MIN_LENGTH || len > MAX_LENGTH) {
          errorEl.style.display = "block";
          return false;
        }

        errorEl.style.display = "none";
        return true;
      };

      input.value = sanitize(input.value);
      validate();

      input.addEventListener("input", () => {
        const cleaned = sanitize(input.value);
        if (input.value !== cleaned) {
          input.value = cleaned;
        }
        validate();
      });

      input.addEventListener("blur", validate);

      const form = input.closest("form");
      if (form && !form.dataset.limiteTelefonoSubmit) {
        form.dataset.limiteTelefonoSubmit = "1";

        form.addEventListener(
          "submit",
          function (e) {
            input.value = sanitize(input.value);

            if (!validate()) {
              e.preventDefault();
              e.stopImmediatePropagation();
              input.focus();
              return false;
            }
          },
          true // 👈 captura, bloquea HubSpot
        );
      }
    };

    INPUT_IDS.forEach(setupPhoneInput);
}


})();
